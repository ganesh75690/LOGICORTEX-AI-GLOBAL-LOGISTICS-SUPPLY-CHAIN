"""
Computer Vision AI Service for Quality Control and Damage Detection
"""

import cv2
import numpy as np
from typing import List, Dict, Any, Optional
import base64
from io import BytesIO
from PIL import Image
import json
from datetime import datetime
import random

class VisionAIService:
    """Computer Vision AI for supply chain quality control"""
    
    def __init__(self):
        self.defect_types = [
            "Scratch", "Dent", "Crack", "Tear", "Stain", 
            "Missing Part", "Misalignment", "Water Damage",
            "Color Fade", "Packaging Damage"
        ]
        
        self.quality_metrics = [
            "Surface Condition", "Structural Integrity", "Color Consistency",
            "Packaging Quality", "Label Clarity", "Dimension Accuracy"
        ]
    
    def analyze_image(self, image_data: str) -> Dict[str, Any]:
        """
        Analyze uploaded image for quality control and damage detection
        
        Args:
            image_data: Base64 encoded image string
            
        Returns:
            Dictionary containing analysis results
        """
        try:
            # Decode base64 image
            image = self._decode_image(image_data)
            
            # Perform AI analysis (simulated for demo)
            analysis_result = self._perform_ai_analysis(image)
            
            # Generate quality score
            quality_score = self._calculate_quality_score(analysis_result)
            
            # Create detailed report
            report = {
                "analysis_id": f"VSN-{datetime.now().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.now().isoformat(),
                "image_info": self._get_image_info(image),
                "defects_detected": analysis_result["defects"],
                "quality_metrics": analysis_result["metrics"],
                "overall_quality_score": quality_score,
                "recommendations": self._generate_recommendations(analysis_result),
                "processing_time": f"{random.uniform(0.5, 2.1):.2f}s",
                "confidence_score": random.uniform(0.85, 0.98)
            }
            
            return {
                "success": True,
                "data": report
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Image analysis failed: {str(e)}"
            }
    
    def batch_analysis(self, images: List[str]) -> Dict[str, Any]:
        """
        Analyze multiple images in batch
        
        Args:
            images: List of base64 encoded images
            
        Returns:
            Dictionary containing batch analysis results
        """
        try:
            batch_results = []
            total_quality_score = 0
            
            for idx, image_data in enumerate(images):
                result = self.analyze_image(image_data)
                if result["success"]:
                    batch_results.append({
                        "image_index": idx + 1,
                        "analysis_id": result["data"]["analysis_id"],
                        "quality_score": result["data"]["overall_quality_score"],
                        "defects_count": len(result["data"]["defects_detected"]),
                        "defects": result["data"]["defects_detected"]
                    })
                    total_quality_score += result["data"]["overall_quality_score"]
            
            # Calculate batch statistics
            avg_quality = total_quality_score / len(batch_results) if batch_results else 0
            
            batch_report = {
                "batch_id": f"BTCH-{datetime.now().strftime('%Y%m%d%H%M%S')}",
                "timestamp": datetime.now().isoformat(),
                "total_images": len(images),
                "processed_images": len(batch_results),
                "average_quality_score": round(avg_quality, 2),
                "quality_distribution": self._calculate_quality_distribution(batch_results),
                "common_defects": self._find_common_defects(batch_results),
                "batch_recommendations": self._generate_batch_recommendations(batch_results),
                "processing_time": f"{random.uniform(2.5, 8.5):.2f}s",
                "results": batch_results
            }
            
            return {
                "success": True,
                "data": batch_report
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Batch analysis failed: {str(e)}"
            }
    
    def generate_quality_report(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate detailed quality report in PDF format
        
        Args:
            analysis_data: Analysis results from image analysis
            
        Returns:
            Dictionary containing report data
        """
        try:
            report = {
                "report_id": f"RPT-{datetime.now().strftime('%Y%m%d%H%M%S')}",
                "generated_at": datetime.now().isoformat(),
                "summary": {
                    "overall_quality": analysis_data.get("overall_quality_score", 0),
                    "total_defects": len(analysis_data.get("defects_detected", [])),
                    "inspection_status": self._get_inspection_status(analysis_data.get("overall_quality_score", 0)),
                    "confidence": analysis_data.get("confidence_score", 0)
                },
                "detailed_analysis": {
                    "defects": analysis_data.get("defects_detected", []),
                    "quality_metrics": analysis_data.get("quality_metrics", {}),
                    "recommendations": analysis_data.get("recommendations", [])
                },
                "compliance_check": {
                    "passes_inspection": analysis_data.get("overall_quality_score", 0) > 70,
                    "critical_issues": [d for d in analysis_data.get("defects_detected", []) if d.get("severity") == "Critical"],
                    "requires_rework": analysis_data.get("overall_quality_score", 0) < 50
                },
                "next_steps": self._generate_next_steps(analysis_data)
            }
            
            return {
                "success": True,
                "data": report
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Report generation failed: {str(e)}"
            }
    
    def _decode_image(self, image_data: str) -> np.ndarray:
        """Decode base64 image to numpy array"""
        # Remove data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode base64
        image_bytes = base64.b64decode(image_data)
        
        # Convert to PIL Image
        pil_image = Image.open(BytesIO(image_bytes))
        
        # Convert to numpy array
        return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    
    def _perform_ai_analysis(self, image: np.ndarray) -> Dict[str, Any]:
        """Simulate AI analysis (replace with real AI model in production)"""
        # Simulate defect detection
        num_defects = random.randint(0, 3)
        defects = []
        
        for i in range(num_defects):
            defect_type = random.choice(self.defect_types)
            severity = random.choice(["Low", "Medium", "High", "Critical"])
            confidence = random.uniform(0.7, 0.95)
            
            # Simulate bounding box
            height, width = image.shape[:2]
            x = random.randint(0, width - 100)
            y = random.randint(0, height - 100)
            w = random.randint(50, 150)
            h = random.randint(50, 150)
            
            defects.append({
                "type": defect_type,
                "severity": severity,
                "confidence": round(confidence, 3),
                "location": {
                    "x": x,
                    "y": y,
                    "width": w,
                    "height": h
                },
                "description": f"{severity} {defect_type} detected with {confidence:.1%} confidence"
            })
        
        # Simulate quality metrics
        metrics = {}
        for metric in self.quality_metrics:
            score = random.randint(60, 100)
            status = "Excellent" if score >= 90 else "Good" if score >= 75 else "Fair" if score >= 60 else "Poor"
            metrics[metric] = {
                "score": score,
                "status": status,
                "notes": f"{metric} analysis completed successfully"
            }
        
        return {
            "defects": defects,
            "metrics": metrics
        }
    
    def _calculate_quality_score(self, analysis_result: Dict[str, Any]) -> int:
        """Calculate overall quality score"""
        defects = analysis_result["defects"]
        metrics = analysis_result["metrics"]
        
        # Base score from metrics
        metric_scores = [m["score"] for m in metrics.values()]
        base_score = sum(metric_scores) / len(metric_scores) if metric_scores else 100
        
        # Penalty for defects
        defect_penalty = 0
        for defect in defects:
            if defect["severity"] == "Critical":
                defect_penalty += 20
            elif defect["severity"] == "High":
                defect_penalty += 10
            elif defect["severity"] == "Medium":
                defect_penalty += 5
            elif defect["severity"] == "Low":
                defect_penalty += 2
        
        final_score = max(0, base_score - defect_penalty)
        return int(final_score)
    
    def _get_image_info(self, image: np.ndarray) -> Dict[str, Any]:
        """Get basic image information"""
        height, width, channels = image.shape
        return {
            "width": width,
            "height": height,
            "channels": channels,
            "size_mb": round(image.nbytes / (1024 * 1024), 2),
            "format": "RGB"
        }
    
    def _generate_recommendations(self, analysis_result: Dict[str, Any]) -> List[str]:
        """Generate improvement recommendations"""
        recommendations = []
        
        # Based on defects
        defects = analysis_result["defects"]
        if defects:
            critical_defects = [d for d in defects if d["severity"] == "Critical"]
            if critical_defects:
                recommendations.append("IMMEDIATE ATTENTION: Critical defects detected - recommend product rejection")
            
            high_defects = [d for d in defects if d["severity"] == "High"]
            if high_defects:
                recommendations.append("High severity issues found - recommend quality review before shipping")
            
            if len(defects) > 2:
                recommendations.append("Multiple defects detected - review quality control process")
        else:
            recommendations.append("No defects detected - product meets quality standards")
        
        # Based on metrics
        metrics = analysis_result["metrics"]
        low_metrics = [name for name, data in metrics.items() if data["score"] < 70]
        if low_metrics:
            recommendations.append(f"Improve {', '.join(low_metrics)} quality control measures")
        
        return recommendations
    
    def _calculate_quality_distribution(self, batch_results: List[Dict]) -> Dict[str, int]:
        """Calculate quality score distribution"""
        distribution = {"Excellent (90-100)": 0, "Good (75-89)": 0, "Fair (60-74)": 0, "Poor (0-59)": 0}
        
        for result in batch_results:
            score = result["quality_score"]
            if score >= 90:
                distribution["Excellent (90-100)"] += 1
            elif score >= 75:
                distribution["Good (75-89)"] += 1
            elif score >= 60:
                distribution["Fair (60-74)"] += 1
            else:
                distribution["Poor (0-59)"] += 1
        
        return distribution
    
    def _find_common_defects(self, batch_results: List[Dict]) -> List[Dict]:
        """Find most common defects in batch"""
        defect_counts = {}
        
        for result in batch_results:
            for defect in result["defects"]:
                defect_type = defect["type"]
                if defect_type not in defect_counts:
                    defect_counts[defect_type] = 0
                defect_counts[defect_type] += 1
        
        # Sort by frequency
        common_defects = sorted(defect_counts.items(), key=lambda x: x[1], reverse=True)
        
        return [
            {
                "defect_type": defect_type,
                "occurrence_count": count,
                "percentage": round((count / len(batch_results)) * 100, 1)
            }
            for defect_type, count in common_defects[:5]
        ]
    
    def _generate_batch_recommendations(self, batch_results: List[Dict]) -> List[str]:
        """Generate batch-level recommendations"""
        recommendations = []
        
        avg_score = sum(r["quality_score"] for r in batch_results) / len(batch_results)
        
        if avg_score >= 90:
            recommendations.append("Excellent batch quality - proceed with shipping")
        elif avg_score >= 75:
            recommendations.append("Good batch quality - standard processing acceptable")
        elif avg_score >= 60:
            recommendations.append("Fair batch quality - consider additional inspection")
        else:
            recommendations.append("Poor batch quality - recommend batch review")
        
        # Check for patterns
        common_defects = self._find_common_defects(batch_results)
        if common_defects and common_defects[0]["percentage"] > 30:
            recommendations.append(f"High occurrence of {common_defects[0]['defect_type']} - review production process")
        
        return recommendations
    
    def _get_inspection_status(self, quality_score: int) -> str:
        """Get inspection status based on quality score"""
        if quality_score >= 90:
            return "PASS - Excellent Quality"
        elif quality_score >= 75:
            return "PASS - Good Quality"
        elif quality_score >= 60:
            return "REVIEW - Fair Quality"
        else:
            return "FAIL - Poor Quality"
    
    def _generate_next_steps(self, analysis_data: Dict[str, Any]) -> List[str]:
        """Generate next steps based on analysis"""
        next_steps = []
        quality_score = analysis_data.get("overall_quality_score", 0)
        defects = analysis_data.get("defects_detected", [])
        
        if quality_score >= 90:
            next_steps.append("Proceed with standard shipping process")
            next_steps.append("Document quality metrics for records")
        elif quality_score >= 75:
            next_steps.append("Process with standard quality checks")
            next_steps.append("Monitor for any customer feedback")
        elif quality_score >= 60:
            next_steps.append("Conduct additional quality inspection")
            next_steps.append("Consider rework for minor defects")
        else:
            next_steps.append("HALT - Do not process for shipping")
            next_steps.append("Return to production for rework")
            next_steps.append("Investigate root cause of quality issues")
        
        critical_defects = [d for d in defects if d.get("severity") == "Critical"]
        if critical_defects:
            next_steps.insert(0, "IMMEDIATE: Remove items with critical defects")
        
        return next_steps

# Create global instance
vision_ai_service = VisionAIService()
