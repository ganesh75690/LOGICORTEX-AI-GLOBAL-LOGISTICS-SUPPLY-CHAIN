import random
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional

from app.config import settings
from app.services.firebase import firebase_service
from app.services.firebase_real import real_firebase_service

router = APIRouter()
security = HTTPBearer()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class OTPRequest(BaseModel):
    contact: str
    contact_type: str = "email"  # email or phone


class OTPVerifyRequest(BaseModel):
    contact: str
    otp: str


class LoginResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[int] = None
    organization_id: Optional[int] = None
    session_token: Optional[str] = None
    expires_at: Optional[str] = None
    requires_otp: bool = False


class LogoutResponse(BaseModel):
    success: bool
    message: str


class LastLoginResponse(BaseModel):
    user_id: int
    last_login: Optional[str]
    login_method: str
    ip_address: Optional[str]
    device_info: Optional[dict]


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """Mock login endpoint"""
    
    # Mock user authentication
    # In real implementation, verify credentials against database
    mock_users = {
        "admin@supplychain.com": {
            "user_id": 1,
            "organization_id": 1,
            "password": "admin123",
            "role": "admin",
            "name": "Admin User"
        },
        "driver@supplychain.com": {
            "user_id": 2,
            "organization_id": 1,
            "password": "driver123",
            "role": "driver",
            "name": "Driver User"
        },
        "supplier@supplychain.com": {
            "user_id": 3,
            "organization_id": 2,
            "password": "supplier123",
            "role": "supplier",
            "name": "Supplier User"
        }
    }
    
    user = mock_users.get(request.email.lower())
    
    if not user or user["password"] != request.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if OTP is required (mock logic)
    requires_otp = random.choice([True, False])
    
    if requires_otp:
        # Generate OTP using real Firebase
        otp_response = await real_firebase_service.otp_generation(request.email, "email")
        
        return LoginResponse(
            success=True,
            message="Login successful. OTP verification required.",
            user_id=user["user_id"],
            organization_id=user["organization_id"],
            requires_otp=True
        )
    
    # Create session directly
    session_data = {
        "ip_address": "192.168.1.100",  # Mock IP
        "user_agent": "Supply Chain Platform Web App",
        "device_info": {
            "platform": "web",
            "browser": "Chrome",
            "version": "120.0"
        }
    }
    
    session_response = await real_firebase_service.session_management(
        user["user_id"], "login", session_data
    )
    
    if not session_response["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create session"
        )
    
    return LoginResponse(
        success=True,
        message="Login successful",
        user_id=user["user_id"],
        organization_id=user["organization_id"],
        session_token=session_response["session_token"],
        expires_at=session_response["expires_at"],
        requires_otp=False
    )


@router.post("/verify-otp", response_model=LoginResponse)
async def verify_otp(request: OTPVerifyRequest):
    """Verify OTP for login"""
    
    otp_response = await real_firebase_service.otp_verification(request.contact, request.otp)
    
    if not otp_response["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=otp_response["message"]
        )
    
    # Get user info (mock)
    mock_users = {
        "admin@supplychain.com": {"user_id": 1, "organization_id": 1},
        "driver@supplychain.com": {"user_id": 2, "organization_id": 1},
        "supplier@supplychain.com": {"user_id": 3, "organization_id": 2}
    }
    
    user = mock_users.get(request.contact.lower())
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Create session
    session_data = {
        "ip_address": "192.168.1.100",
        "user_agent": "Supply Chain Platform Web App",
        "device_info": {
            "platform": "web",
            "browser": "Chrome",
            "version": "120.0"
        }
    }
    
    session_response = await real_firebase_service.session_management(
        user["user_id"], "login", session_data
    )
    
    if not session_response["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create session"
        )
    
    return LoginResponse(
        success=True,
        message="OTP verified successfully",
        user_id=user["user_id"],
        organization_id=user["organization_id"],
        session_token=session_response["session_token"],
        expires_at=session_response["expires_at"],
        requires_otp=False
    )


@router.post("/logout", response_model=LogoutResponse)
async def logout(token: str = Depends(security)):
    """Logout endpoint"""
    
    # Extract user_id from token (mock implementation)
    # In real implementation, decode JWT token
    user_id = 1  # Mock user_id
    
    session_response = await real_firebase_service.session_management(user_id, "logout")
    
    if not session_response["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=session_response["message"]
        )
    
    return LogoutResponse(
        success=True,
        message="Logged out successfully"
    )


@router.post("/send-otp")
async def send_otp(request: OTPRequest):
    """Send OTP for verification"""
    
    # Validate contact format
    if request.contact_type == "email":
        if "@" not in request.contact:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )
    elif request.contact_type == "phone":
        if not request.contact.isdigit() or len(request.contact) < 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phone number format"
            )
    
    otp_response = await real_firebase_service.otp_generation(request.contact, request.contact_type)
    
    if not otp_response["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send OTP"
        )
    
    return {
        "success": True,
        "message": "OTP sent successfully",
        "contact": request.contact,
        "contact_type": request.contact_type,
        "expires_in_minutes": otp_response["expires_in_minutes"],
        "debug_otp": otp_response["debug_otp"]  # Only for demo
    }


@router.get("/last-login", response_model=LastLoginResponse)
async def get_last_login(user_id: int, token: str = Depends(security)):
    """Get last login information"""
    
    # Mock last login data
    last_login_data = {
        "user_id": user_id,
        "last_login": (datetime.utcnow() - timedelta(hours=random.randint(1, 72))).isoformat(),
        "login_method": random.choice(["password", "otp", "sso"]),
        "ip_address": f"192.168.1.{random.randint(100, 255)}",
        "device_info": {
            "platform": random.choice(["web", "mobile", "tablet"]),
            "browser": random.choice(["Chrome", "Safari", "Firefox"]),
            "version": f"{random.randint(110, 125)}.0"
        }
    }
    
    return LastLoginResponse(**last_login_data)


@router.post("/refresh-token")
async def refresh_token(token: str = Depends(security)):
    """Refresh session token"""
    
    # Mock token refresh
    # In real implementation, decode current token and issue new one
    
    new_token = f"token_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{random.randint(10000, 99999)}"
    expires_at = (datetime.utcnow() + timedelta(hours=24)).isoformat()
    
    return {
        "success": True,
        "message": "Token refreshed successfully",
        "session_token": new_token,
        "expires_at": expires_at
    }


@router.get("/verify-session")
async def verify_session(token: str = Depends(security)):
    """Verify if session is valid"""
    
    # Mock session verification
    # In real implementation, decode and validate JWT token
    
    return {
        "success": True,
        "session_valid": True,
        "expires_at": (datetime.utcnow() + timedelta(hours=23)).isoformat(),
        "time_remaining_hours": 23.5
    }


