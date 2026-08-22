import redis
import json
import pickle
from typing import Any, Optional, Union
from datetime import timedelta
import logging
from app.config import settings

logger = logging.getLogger(__name__)


class RedisCache:
    """Redis cache client with serialization support"""
    
    def __init__(self):
        self.redis_client = None
        self.connected = False
        self._connect()
    
    def _connect(self):
        """Connect to Redis"""
        try:
            self.redis_client = redis.from_url(
                settings.REDIS_URL,
                decode_responses=False,  # Handle binary data
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True
            )
            # Test connection
            self.redis_client.ping()
            self.connected = True
            logger.info("✅ Redis connected successfully")
        except Exception as e:
            logger.error(f"❌ Redis connection failed: {e}")
            self.connected = False
    
    def _serialize(self, value: Any) -> bytes:
        """Serialize value for Redis storage"""
        if isinstance(value, (dict, list, tuple)):
            return json.dumps(value).encode('utf-8')
        elif isinstance(value, (str, int, float, bool)):
            return str(value).encode('utf-8')
        else:
            return pickle.dumps(value)
    
    def _deserialize(self, value: bytes) -> Any:
        """Deserialize value from Redis"""
        try:
            # Try JSON first
            return json.loads(value.decode('utf-8'))
        except (json.JSONDecodeError, UnicodeDecodeError):
            try:
                # Try pickle
                return pickle.loads(value)
            except:
                # Return as string
                return value.decode('utf-8', errors='ignore')
    
    def set(self, key: str, value: Any, expire: Optional[Union[int, timedelta]] = None) -> bool:
        """Set value in cache"""
        if not self.connected:
            return False
        
        try:
            serialized_value = self._serialize(value)
            
            if expire:
                if isinstance(expire, timedelta):
                    expire = int(expire.total_seconds())
                return self.redis_client.setex(key, expire, serialized_value)
            else:
                return self.redis_client.set(key, serialized_value)
        except Exception as e:
            logger.error(f"Redis set error: {e}")
            return False
    
    def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        if not self.connected:
            return None
        
        try:
            value = self.redis_client.get(key)
            if value is None:
                return None
            return self._deserialize(value)
        except Exception as e:
            logger.error(f"Redis get error: {e}")
            return None
    
    def delete(self, key: str) -> bool:
        """Delete key from cache"""
        if not self.connected:
            return False
        
        try:
            return bool(self.redis_client.delete(key))
        except Exception as e:
            logger.error(f"Redis delete error: {e}")
            return False
    
    def exists(self, key: str) -> bool:
        """Check if key exists"""
        if not self.connected:
            return False
        
        try:
            return bool(self.redis_client.exists(key))
        except Exception as e:
            logger.error(f"Redis exists error: {e}")
            return False
    
    def expire(self, key: str, seconds: int) -> bool:
        """Set expiration for key"""
        if not self.connected:
            return False
        
        try:
            return bool(self.redis_client.expire(key, seconds))
        except Exception as e:
            logger.error(f"Redis expire error: {e}")
            return False
    
    def ttl(self, key: str) -> int:
        """Get time to live for key"""
        if not self.connected:
            return -1
        
        try:
            return self.redis_client.ttl(key)
        except Exception as e:
            logger.error(f"Redis ttl error: {e}")
            return -1
    
    def increment(self, key: str, amount: int = 1) -> Optional[int]:
        """Increment numeric value"""
        if not self.connected:
            return None
        
        try:
            return self.redis_client.incrby(key, amount)
        except Exception as e:
            logger.error(f"Redis increment error: {e}")
            return None
    
    def decrement(self, key: str, amount: int = 1) -> Optional[int]:
        """Decrement numeric value"""
        if not self.connected:
            return None
        
        try:
            return self.redis_client.decrby(key, amount)
        except Exception as e:
            logger.error(f"Redis decrement error: {e}")
            return None
    
    def get_keys(self, pattern: str = "*") -> list:
        """Get all keys matching pattern"""
        if not self.connected:
            return []
        
        try:
            keys = self.redis_client.keys(pattern)
            return [key.decode('utf-8') for key in keys]
        except Exception as e:
            logger.error(f"Redis get_keys error: {e}")
            return []
    
    def flushdb(self) -> bool:
        """Flush current database"""
        if not self.connected:
            return False
        
        try:
            return self.redis_client.flushdb()
        except Exception as e:
            logger.error(f"Redis flushdb error: {e}")
            return False
    
    def ping(self) -> bool:
        """Ping Redis server"""
        if not self.connected:
            return False
        
        try:
            return self.redis_client.ping()
        except Exception as e:
            logger.error(f"Redis ping error: {e}")
            return False
    
    def get_info(self) -> dict:
        """Get Redis server info"""
        if not self.connected:
            return {}
        
        try:
            info = self.redis_client.info()
            return {
                "redis_version": info.get("redis_version"),
                "used_memory": info.get("used_memory_human"),
                "connected_clients": info.get("connected_clients"),
                "total_commands_processed": info.get("total_commands_processed"),
                "keyspace_hits": info.get("keyspace_hits"),
                "keyspace_misses": info.get("keyspace_misses"),
            }
        except Exception as e:
            logger.error(f"Redis info error: {e}")
            return {}


# Global Redis cache instance
redis_cache = RedisCache()


# Cache decorators and utilities
def cache_key(*parts):
    """Generate cache key from parts"""
    return ":".join(str(part) for part in parts)


def cached(expire: Union[int, timedelta] = 3600, key_prefix: str = ""):
    """Decorator for caching function results"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            # Generate cache key
            cache_parts = [key_prefix, func.__name__]
            
            # Add args to key (skip self if method)
            if args and hasattr(args[0], '__class__'):
                cache_parts.extend(str(arg) for arg in args[1:])
            else:
                cache_parts.extend(str(arg) for arg in args)
            
            # Add kwargs to key (sorted for consistency)
            if kwargs:
                sorted_kwargs = sorted(kwargs.items())
                cache_parts.extend(f"{k}={v}" for k, v in sorted_kwargs)
            
            cache_key_str = cache_key(*cache_parts)
            
            # Try to get from cache
            cached_result = redis_cache.get(cache_key_str)
            if cached_result is not None:
                return cached_result
            
            # Execute function and cache result
            result = func(*args, **kwargs)
            redis_cache.set(cache_key_str, result, expire)
            
            return result
        
        return wrapper
    return decorator


def invalidate_cache_pattern(pattern: str):
    """Invalidate all cache keys matching pattern"""
    keys = redis_cache.get_keys(pattern)
    for key in keys:
        redis_cache.delete(key)
    return len(keys)
