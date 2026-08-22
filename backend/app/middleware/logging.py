import logging
import time
import uuid
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Dict, Any
import json
from datetime import datetime

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)


class LoggingMiddleware(BaseHTTPMiddleware):
    """Enhanced logging middleware for API requests and responses"""
    
    def __init__(self, app, log_level: str = "INFO"):
        super().__init__(app)
        self.logger = logging.getLogger("api_logger")
        self.logger.setLevel(getattr(logging, log_level.upper()))
        
        # Create structured logger
        self.setup_structured_logging()
    
    def setup_structured_logging(self):
        """Setup structured logging format"""
        formatter = logging.Formatter(
            '%(asctime)s | %(levelname)s | %(name)s | %(message)s'
        )
        
        # File handler
        file_handler = logging.FileHandler('api_requests.log')
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)
        
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)
    
    async def dispatch(self, request: Request, call_next):
        # Generate unique request ID
        request_id = str(uuid.uuid4())
        
        # Store request ID in state for use in endpoints
        request.state.request_id = request_id
        
        # Record start time
        start_time = time.time()
        
        # Get client info
        client_info = self._get_client_info(request)
        
        # Log request
        request_log = {
            "request_id": request_id,
            "method": request.method,
            "url": str(request.url),
            "path": request.url.path,
            "query_params": dict(request.query_params),
            "client_info": client_info,
            "user_agent": request.headers.get("user-agent"),
            "timestamp": datetime.utcnow().isoformat(),
            "type": "request"
        }
        
        # Log request (excluding sensitive data)
        self.logger.info(json.dumps(request_log, default=str))
        
        # Process request
        try:
            response = await call_next(request)
            
            # Calculate processing time
            process_time = time.time() - start_time
            
            # Log response
            response_log = {
                "request_id": request_id,
                "status_code": response.status_code,
                "process_time_ms": round(process_time * 1000, 2),
                "content_length": response.headers.get("content-length"),
                "timestamp": datetime.utcnow().isoformat(),
                "type": "response"
            }
            
            # Log response
            if response.status_code >= 400:
                self.logger.error(json.dumps(response_log, default=str))
            else:
                self.logger.info(json.dumps(response_log, default=str))
            
            # Add custom headers
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Process-Time"] = f"{process_time:.3f}"
            
            return response
            
        except Exception as e:
            # Calculate processing time
            process_time = time.time() - start_time
            
            # Log error
            error_log = {
                "request_id": request_id,
                "error": str(e),
                "error_type": type(e).__name__,
                "process_time_ms": round(process_time * 1000, 2),
                "timestamp": datetime.utcnow().isoformat(),
                "type": "error"
            }
            
            self.logger.error(json.dumps(error_log, default=str))
            
            # Re-raise exception
            raise
    
    def _get_client_info(self, request: Request) -> Dict[str, Any]:
        """Get client information from request"""
        client_info = {
            "host": request.client.host,
            "port": request.client.port
        }
        
        # Check for proxy headers
        if "x-forwarded-for" in request.headers:
            client_info["forwarded_for"] = request.headers["x-forwarded-for"]
            client_info["real_ip"] = request.headers["x-forwarded-for"].split(",")[0].strip()
        
        if "x-real-ip" in request.headers:
            client_info["real_ip"] = request.headers["x-real-ip"]
        
        if "x-forwarded-host" in request.headers:
            client_info["forwarded_host"] = request.headers["x-forwarded-host"]
        
        return client_info


class SecurityLoggingMiddleware(BaseHTTPMiddleware):
    """Security-focused logging middleware"""
    
    def __init__(self, app):
        super().__init__(app)
        self.logger = logging.getLogger("security_logger")
        
        # Setup security logger
        handler = logging.FileHandler('security.log')
        formatter = logging.Formatter(
            '%(asctime)s | %(levelname)s | SECURITY | %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    async def dispatch(self, request: Request, call_next):
        # Log security events
        await self._log_security_event(request, "request_start")
        
        # Process request
        response = await call_next(request)
        
        # Log security events based on response
        if response.status_code == 401:
            await self._log_security_event(request, "unauthorized_access", response.status_code)
        elif response.status_code == 403:
            await self._log_security_event(request, "forbidden_access", response.status_code)
        elif response.status_code == 429:
            await self._log_security_event(request, "rate_limit_exceeded", response.status_code)
        
        return response
    
    async def _log_security_event(self, request: Request, event_type: str, status_code: int = None):
        """Log security event"""
        security_log = {
            "event_type": event_type,
            "method": request.method,
            "path": request.url.path,
            "ip": self._get_client_ip(request),
            "user_agent": request.headers.get("user-agent"),
            "timestamp": datetime.utcnow().isoformat(),
            "status_code": status_code
        }
        
        # Add suspicious patterns
        suspicious_patterns = self._check_suspicious_patterns(request)
        if suspicious_patterns:
            security_log["suspicious_patterns"] = suspicious_patterns
        
        self.logger.warning(json.dumps(security_log, default=str))
    
    def _get_client_ip(self, request: Request) -> str:
        """Get real client IP"""
        if "x-forwarded-for" in request.headers:
            return request.headers["x-forwarded-for"].split(",")[0].strip()
        elif "x-real-ip" in request.headers:
            return request.headers["x-real-ip"]
        else:
            return request.client.host
    
    def _check_suspicious_patterns(self, request: Request) -> list:
        """Check for suspicious request patterns"""
        patterns = []
        
        # Check for common attack patterns
        user_agent = request.headers.get("user-agent", "").lower()
        if any(bot in user_agent for bot in ["bot", "crawler", "spider", "scraper"]):
            patterns.append("bot_user_agent")
        
        # Check for SQL injection patterns
        query_string = str(request.query_params).lower()
        sql_patterns = ["union select", "drop table", "insert into", "delete from", "' or '", "' or 1=1"]
        if any(pattern in query_string for pattern in sql_patterns):
            patterns.append("sql_injection_attempt")
        
        # Check for XSS patterns
        if any(xss in query_string for xss in ["<script>", "javascript:", "onerror="]):
            patterns.append("xss_attempt")
        
        # Check for path traversal
        path = request.url.path.lower()
        if any(traversal in path for traversal in ["../", "..\\", "%2e%2e%2f"]):
            patterns.append("path_traversal_attempt")
        
        return patterns


def get_request_logger():
    """Get logger for current request"""
    return logging.getLogger("api_logger")


def log_business_event(event_type: str, data: Dict[str, Any], user_id: int = None):
    """Log business events"""
    business_log = {
        "event_type": event_type,
        "data": data,
        "user_id": user_id,
        "timestamp": datetime.utcnow().isoformat(),
        "service": "supply_chain_api"
    }
    
    logger = logging.getLogger("business_logger")
    logger.info(json.dumps(business_log, default=str))


def log_error(error: Exception, context: Dict[str, Any] = None):
    """Log errors with context"""
    error_log = {
        "error_type": type(error).__name__,
        "error_message": str(error),
        "context": context or {},
        "timestamp": datetime.utcnow().isoformat(),
        "service": "supply_chain_api"
    }
    
    logger = logging.getLogger("error_logger")
    logger.error(json.dumps(error_log, default=str), exc_info=True)
