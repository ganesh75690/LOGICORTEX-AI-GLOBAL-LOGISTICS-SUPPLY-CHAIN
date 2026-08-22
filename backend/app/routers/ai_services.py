from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import Dict, Any, List, Optional

from app.services.vertex_ai import vertex_ai_service
from app.services.gemini import gemini_service
from app.services.google_maps import google_maps_service

router = APIRouter()
security = HTTPBearer()


class DemandForecastRequest(BaseModel):
    product_id: str
    date_range: Dict[str, str]


class DisruptionPredictRequest(BaseModel):
    route_id: str
    weather: Dict[str, Any]
    traffic: Dict[str, Any]


class RouteOptimizeRequest(BaseModel):
    source: Dict[str, float]
    destination: Dict[str, float]
    constraints: Dict[str, Any]


class AnomalyDetectRequest(BaseModel):
    login_data: Dict[str, Any]
    user_behavior: Dict[str, Any]


class NaturalLanguageQueryRequest(BaseModel):
    question: str
    organization_context: Dict[str, Any]


class AIRecommendationsRequest(BaseModel):
    system_state: Dict[str, Any]


class ExplainableAIRequest(BaseModel):
    decision_data: Dict[str, Any]


class RouteVisualizationRequest(BaseModel):
    source: Dict[str, float]
    destination: Dict[str, float]


class RiskHeatmapRequest(BaseModel):
    center_lat: float
    center_lng: float
    radius_km: float


class GeoFencingRequest(BaseModel):
    driver_location: Dict[str, float]
    fence_config: Dict[str, Any]


class DistanceETARequest(BaseModel):
    source: Dict[str, float]
    destination: Dict[str, float]
    transport_mode: str = "driving"


# Vertex AI Endpoints
@router.post("/demand-forecast")
async def demand_forecast(request: DemandForecastRequest, token: str = Depends(security)):
    """Demand Forecasting API"""
    try:
        result = await vertex_ai_service.demand_forecast(request.product_id, request.date_range)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Demand forecast failed: {str(e)}"
        )


@router.post("/disruption-predict")
async def disruption_predict(request: DisruptionPredictRequest, token: str = Depends(security)):
    """Disruption Prediction API"""
    try:
        result = await vertex_ai_service.disruption_prediction(
            request.route_id, request.weather, request.traffic
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Disruption prediction failed: {str(e)}"
        )


@router.post("/route-optimize")
async def route_optimize(request: RouteOptimizeRequest, token: str = Depends(security)):
    """Route Optimization API"""
    try:
        result = await vertex_ai_service.route_optimization(
            request.source, request.destination, request.constraints
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Route optimization failed: {str(e)}"
        )


@router.post("/anomaly-detect")
async def anomaly_detect(request: AnomalyDetectRequest, token: str = Depends(security)):
    """Anomaly Detection API"""
    try:
        result = await vertex_ai_service.anomaly_detection(
            request.login_data, request.user_behavior
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Anomaly detection failed: {str(e)}"
        )


# Gemini AI Endpoints
@router.post("/natural-language-query")
async def natural_language_query(request: NaturalLanguageQueryRequest, token: str = Depends(security)):
    """Natural Language Query API"""
    try:
        result = await gemini_service.natural_language_query(
            request.question, request.organization_context
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Natural language query failed: {str(e)}"
        )


@router.post("/recommendations")
async def ai_recommendations(request: AIRecommendationsRequest, token: str = Depends(security)):
    """AI Recommendations API"""
    try:
        result = await gemini_service.ai_recommendations(request.system_state)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI recommendations failed: {str(e)}"
        )


@router.post("/explainable-ai")
async def explainable_ai(request: ExplainableAIRequest, token: str = Depends(security)):
    """Explainable AI API"""
    try:
        decision_data = {
            "decision_type": request.decision_data.get("decision_type", "unknown"),
            **request.decision_data
        }
        result = await gemini_service.explainable_ai(decision_data)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Explainable AI failed: {str(e)}"
        )


# Google Maps API Endpoints
@router.post("/route-visualization")
async def route_visualization(request: RouteVisualizationRequest, token: str = Depends(security)):
    """Route Visualization API"""
    try:
        result = await google_maps_service.route_visualization(request.source, request.destination)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Route visualization failed: {str(e)}"
        )


@router.post("/risk-heatmap")
async def risk_heatmap(request: RiskHeatmapRequest, token: str = Depends(security)):
    """Risk Heatmap API"""
    try:
        region = {
            "center_lat": request.center_lat,
            "center_lng": request.center_lng,
            "radius_km": request.radius_km
        }
        result = await google_maps_service.risk_heatmap(region)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Risk heatmap failed: {str(e)}"
        )


@router.post("/geo-fencing")
async def geo_fencing(request: GeoFencingRequest, token: str = Depends(security)):
    """Geo-fencing API"""
    try:
        result = await google_maps_service.geo_fencing(request.driver_location, request.fence_config)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Geo-fencing failed: {str(e)}"
        )


@router.post("/distance-eta")
async def distance_eta(request: DistanceETARequest, token: str = Depends(security)):
    """Distance & ETA API"""
    try:
        result = await google_maps_service.distance_eta(
            request.source, request.destination, request.transport_mode
        )
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Distance & ETA calculation failed: {str(e)}"
        )


@router.get("/ai-services-status")
async def get_ai_services_status(token: str = Depends(security)):
    """Get status of all AI services"""
    return {
        "success": True,
        "services": {
            "vertex_ai": {
                "status": "operational",
                "models": ["demand_forecasting", "disruption_prediction", "route_optimization", "anomaly_detection"],
                "last_updated": "2024-01-15T10:30:00Z"
            },
            "gemini": {
                "status": "operational",
                "models": ["natural_language_query", "ai_recommendations", "explainable_ai"],
                "last_updated": "2024-01-15T10:30:00Z"
            },
            "google_maps": {
                "status": "operational",
                "services": ["route_visualization", "risk_heatmap", "geo_fencing", "distance_eta"],
                "last_updated": "2024-01-15T10:30:00Z"
            },
            "firebase": {
                "status": "operational",
                "services": ["otp_verification", "real_time_alerts", "live_location_tracking", "session_management"],
                "last_updated": "2024-01-15T10:30:00Z"
            },
            "bigquery": {
                "status": "operational",
                "services": ["platform_analytics", "organization_reports", "demand_analytics", "driver_performance"],
                "last_updated": "2024-01-15T10:30:00Z"
            }
        }
    }
