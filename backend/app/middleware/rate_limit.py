from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Dict, Optional
import time
import hashlib
import logging
from app.cache.redis_client import redis_cache

logger = logging.getLogger(__name__)


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Rate limiting middleware using Redis"""
    
    def __init__(
        self,
        app,
        default_limits: Dict[str, int] = None,
        custom_limits: Dict[str, Dict[str, int]] = None
    ):
        super().__init__(app)
        self.default_limits = default_limits or {
            "requests_per_minute": 60,
            "requests_per_hour": 1000,
            "requests_per_day": 10000
        }
        self.custom_limits = custom_limits or {}
    
    async def dispatch(self, request: Request, call_next):
        # Get client identifier
        client_id = self._get_client_id(request)
        
        # Get rate limits for this endpoint
        limits = self._get_limits_for_endpoint(request.url.path)
        
        # Check rate limits
        for limit_type, max_requests in limits.items():
            if not await self._check_rate_limit(client_id, limit_type, max_requests):
                return JSONResponse(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    content={
                        "detail": f"Rate limit exceeded: {limit_type}",
                        "retry_after": self._get_retry_after(client_id, limit_type),
                        "limit_type": limit_type,
                        "max_requests": max_requests
                    }
                )
        
        # Process request
        response = await call_next(request)
        
        # Add rate limit headers
        self._add_rate_limit_headers(response, client_id, limits)
        
        return response
    
    def _get_client_id(self, request: Request) -> str:
        """Generate unique client identifier"""
        # Try to get user ID from token (if authenticated)
        auth_header = request.headers.get("authorization")
        if auth_header:
            # In real implementation, decode JWT to get user ID
            # For demo, use token hash
            user_id = hashlib.md5(auth_header.encode()).hexdigest()[:16]
            return f"user:{user_id}"
        
        # Fall back to IP address
        client_ip = request.client.host
        if "x-forwarded-for" in request.headers:
            # Get real IP from proxy
            client_ip = request.headers["x-forwarded-for"].split(",")[0].strip()
        
        return f"ip:{hashlib.md5(client_ip.encode()).hexdigest()[:16]}"
    
    def _get_limits_for_endpoint(self, path: str) -> Dict[str, int]:
        """Get rate limits for specific endpoint"""
        # Check custom limits first
        for pattern, limits in self.custom_limits.items():
            if pattern in path:
                return limits
        
        # Default limits by endpoint type
        if "/auth/" in path:
            return {
                "requests_per_minute": 10,
                "requests_per_hour": 100,
                "requests_per_day": 500
            }
        elif "/ai/" in path:
            return {
                "requests_per_minute": 30,
                "requests_per_hour": 500,
                "requests_per_day": 5000
            }
        elif "/analytics/" in path:
            return {
                "requests_per_minute": 20,
                "requests_per_hour": 200,
                "requests_per_day": 2000
            }
        else:
            return self.default_limits
    
    async def _check_rate_limit(self, client_id: str, limit_type: str, max_requests: int) -> bool:
        """Check if client has exceeded rate limit"""
        try:
            # Generate cache key
            cache_key = f"rate_limit:{client_id}:{limit_type}"
            
            # Get current request count
            current_count = redis_cache.get(cache_key) or 0
            
            # Check if limit exceeded
            if current_count >= max_requests:
                return False
            
            # Increment counter
            ttl = self._get_ttl_for_limit_type(limit_type)
            redis_cache.increment(cache_key)
            
            # Set expiration if this is the first request
            if current_count == 0:
                redis_cache.expire(cache_key, ttl)
            
            return True
            
        except Exception as e:
            logger.error(f"Rate limit check error: {e}")
            # Allow request if rate limiting fails
            return True
    
    def _get_ttl_for_limit_type(self, limit_type: str) -> int:
        """Get TTL in seconds for limit type"""
        if limit_type == "requests_per_minute":
            return 60
        elif limit_type == "requests_per_hour":
            return 3600
        elif limit_type == "requests_per_day":
            return 86400
        else:
            return 3600
    
    def _get_retry_after(self, client_id: str, limit_type: str) -> int:
        """Get retry after seconds"""
        try:
            cache_key = f"rate_limit:{client_id}:{limit_type}"
            ttl = redis_cache.ttl(cache_key)
            return max(1, ttl)
        except:
            return 60
    
    def _add_rate_limit_headers(self, response, client_id: str, limits: Dict[str, int]):
        """Add rate limit headers to response"""
        try:
            for limit_type, max_requests in limits.items():
                cache_key = f"rate_limit:{client_id}:{limit_type}"
                current_count = redis_cache.get(cache_key) or 0
                remaining = max(0, max_requests - current_count)
                
                header_name = f"X-RateLimit-{limit_type.replace('_', '-')}"
                response.headers[header_name] = f"{remaining}/{max_requests}"
                
                # Add reset time
                ttl = redis_cache.ttl(cache_key)
                if ttl > 0:
                    reset_header = f"X-RateLimit-Reset-{limit_type.replace('_', '-')}"
                    response.headers[reset_header] = str(int(time.time()) + ttl)
        except Exception as e:
            logger.error(f"Error adding rate limit headers: {e}")


class RateLimiter:
    """Standalone rate limiter for specific use cases"""
    
    @staticmethod
    async def is_allowed(
        key: str,
        limit: int,
        window: int,
        identifier: Optional[str] = None
    ) -> tuple[bool, Dict]:
        """Check if action is allowed"""
        try:
            # Generate cache key
            cache_key = f"custom_rate_limit:{key}:{identifier or 'global'}"
            
            # Get current count
            current_count = redis_cache.get(cache_key) or 0
            
            # Check limit
            if current_count >= limit:
                ttl = redis_cache.ttl(cache_key)
                return False, {
                    "allowed": False,
                    "limit": limit,
                    "remaining": 0,
                    "reset_time": int(time.time()) + ttl if ttl > 0 else int(time.time()) + window
                }
            
            # Increment counter
            redis_cache.increment(cache_key)
            
            # Set expiration if first request
            if current_count == 0:
                redis_cache.expire(cache_key, window)
            
            remaining = limit - (current_count + 1)
            return True, {
                "allowed": True,
                "limit": limit,
                "remaining": remaining,
                "reset_time": int(time.time()) + window
            }
            
        except Exception as e:
            logger.error(f"Custom rate limit error: {e}")
            # Allow if rate limiting fails
            return True, {
                "allowed": True,
                "limit": limit,
                "remaining": limit - 1,
                "reset_time": int(time.time()) + window
            }


# Rate limiting decorators
def rate_limit(
    requests_per_minute: int = 60,
    requests_per_hour: int = 1000,
    requests_per_day: int = 10000,
    key_func=None
):
    """Decorator for rate limiting API endpoints"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # Get request from args (FastAPI dependency injection)
            request = None
            for arg in args:
                if hasattr(arg, 'url'):
                    request = arg
                    break
            
            if not request:
                # If no request found, allow the call
                return await func(*args, **kwargs)
            
            # Get client identifier
            if key_func:
                client_id = key_func(request)
            else:
                rate_limiter = RateLimitMiddleware(None)
                client_id = rate_limiter._get_client_id(request)
            
            # Check rate limits
            limits = {
                "requests_per_minute": requests_per_minute,
                "requests_per_hour": requests_per_hour,
                "requests_per_day": requests_per_day
            }
            
            for limit_type, max_requests in limits.items():
                allowed, info = await RateLimiter.is_allowed(
                    f"endpoint:{func.__name__}",
                    max_requests,
                    RateLimitMiddleware(None)._get_ttl_for_limit_type(limit_type),
                    client_id
                )
                
                if not allowed:
                    raise HTTPException(
                        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                        detail=f"Rate limit exceeded: {limit_type}",
                        headers={"Retry-After": str(info["reset_time"] - int(time.time()))}
                    )
            
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator
