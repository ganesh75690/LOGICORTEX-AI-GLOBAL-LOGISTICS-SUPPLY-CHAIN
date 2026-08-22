import React, { useState, useCallback } from 'react';
import apiClient from '../api/api';

interface Defect {
  type: string;
  severity: string;
  confidence: number;
  location: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
}

interface QualityMetric {
  score: number;
  status: string;
  notes: string;
}

interface AnalysisResult {
  analysis_id: string;
  timestamp: string;
  image_info: {
    width: number;
    height: number;
    channels: number;
    size_mb: number;
    format: string;
  };
  defects_detected: Defect[];
  quality_metrics: Record<string, QualityMetric>;
  overall_quality_score: number;
  recommendations: string[];
  processing_time: string;
  confidence_score: number;
}

interface BatchResult {
  batch_id: string;
  timestamp: string;
  total_images: number;
  processed_images: number;
  average_quality_score: number;
  quality_distribution: Record<string, number>;
  common_defects: Array<{
    defect_type: string;
    occurrence_count: number;
    percentage: number;
  }>;
  batch_recommendations: string[];
  processing_time: string;
  results: Array<{
    image_index: number;
    analysis_id: string;
    quality_score: number;
    defects_count: number;
    defects: Defect[];
  }>;
}

const VisionAI: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [batchResults, setBatchResults] = useState<BatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzingBatch, setIsAnalyzingBatch] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
    }
  }, []);

  const handleBatchUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedFiles(imageFiles);
    setBatchResults(null);
    setError(null);
  }, []);

  const analyzeImage = useCallback(async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert data URL to base64
      const base64Data = selectedImage.split(',')[1];
      
      const response = await apiClient.analyzeImage(base64Data, `PROD-${Date.now()}`, 'quality_control');

      if (response.success) {
        setAnalysisResult(response.data as AnalysisResult);
      } else {
        setError('Analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to analyze image. Please check your connection.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedImage]);

  const analyzeBatch = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    setIsAnalyzingBatch(true);
    setError(null);

    try {
      // Convert all files to base64
      const base64Images = await Promise.all(
        selectedFiles.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              resolve(result.split(',')[1]);
            };
            reader.readAsDataURL(file);
          });
        })
      );

      const response = await apiClient.batchAnalysis(base64Images, `BATCH-${Date.now()}`, 'quality_control');

      if (response.success) {
        setBatchResults(response.data as BatchResult);
      } else {
        setError('Batch analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to analyze batch. Please check your connection.');
    } finally {
      setIsAnalyzingBatch(false);
    }
  }, [selectedFiles]);

  const getQualityColor = (score: number) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 75) return '#8BC34A';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return '#F44336';
      case 'High': return '#FF5722';
      case 'Medium': return '#FF9800';
      case 'Low': return '#FFC107';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="vision-ai-container">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
          🤖 Computer Vision AI
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          AI-Powered Quality Control & Damage Detection
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #eee' }}>
        <button
          onClick={() => setActiveTab('single')}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: activeTab === 'single' ? '#2196F3' : '#f5f5f5',
            color: activeTab === 'single' ? 'white' : '#333',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          📸 Single Image Analysis
        </button>
        <button
          onClick={() => setActiveTab('batch')}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: activeTab === 'batch' ? '#2196F3' : '#f5f5f5',
            color: activeTab === 'batch' ? 'white' : '#333',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          📦 Batch Analysis
        </button>
      </div>

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#c62828'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {activeTab === 'single' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Upload Section */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333' }}>
              📤 Upload Image
            </h2>
            
            <div style={{
              border: '2px dashed #ddd',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              backgroundColor: '#fafafa'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Choose Image
              </label>
              
              {selectedImage && (
                <div style={{ marginTop: '20px' }}>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      border: '1px solid #ddd'
                    }}
                  />
                </div>
              )}
            </div>

            {selectedImage && (
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: isAnalyzing ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  width: '100%'
                }}
              >
                {isAnalyzing ? '🔄 Analyzing...' : '🔍 Analyze Image'}
              </button>
            )}
          </div>

          {/* Results Section */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333' }}>
              📊 Analysis Results
            </h2>
            
            {analysisResult ? (
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #ddd' }}>
                {/* Quality Score */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Overall Quality Score</h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: getQualityColor(analysisResult.overall_quality_score)
                    }}>
                      {analysisResult.overall_quality_score}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.1rem', color: '#666' }}>
                        {analysisResult.overall_quality_score >= 90 ? 'Excellent' :
                         analysisResult.overall_quality_score >= 75 ? 'Good' :
                         analysisResult.overall_quality_score >= 60 ? 'Fair' : 'Poor'}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#999' }}>
                        Confidence: {(analysisResult.confidence_score * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Defects */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                    Defects Detected ({analysisResult.defects_detected.length})
                  </h3>
                  {analysisResult.defects_detected.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {analysisResult.defects_detected.map((defect, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '10px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '6px',
                            borderLeft: `4px solid ${getSeverityColor(defect.severity)}`
                          }}
                        >
                          <div style={{ fontWeight: 'bold', color: '#333' }}>
                            {defect.type}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>
                            Severity: <span style={{ color: getSeverityColor(defect.severity) }}>
                              {defect.severity}
                            </span> | Confidence: {(defect.confidence * 100).toFixed(1)}%
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px' }}>
                            {defect.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ No defects detected</p>
                  )}
                </div>

                {/* Recommendations */}
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Recommendations</h3>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '5px', color: '#666' }}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Processing Info */}
                <div style={{
                  marginTop: '20px',
                  padding: '10px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  Processing Time: {analysisResult.processing_time} | 
                  Analysis ID: {analysisResult.analysis_id}
                </div>
              </div>
            ) : (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '12px',
                color: '#666'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
                <p>Upload an image and click "Analyze" to see results</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Batch Upload Section */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333' }}>
              📦 Upload Multiple Images
            </h2>
            
            <div style={{
              border: '2px dashed #ddd',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              backgroundColor: '#fafafa'
            }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleBatchUpload}
                style={{ display: 'none' }}
                id="batch-upload"
              />
              <label
                htmlFor="batch-upload"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Choose Multiple Images
              </label>
              
              {selectedFiles.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <p style={{ marginBottom: '10px', color: '#666' }}>
                    {selectedFiles.length} images selected
                  </p>
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {selectedFiles.map((file, index) => (
                      <div key={index} style={{ fontSize: '0.9rem', color: '#666' }}>
                        📄 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedFiles.length > 0 && (
              <button
                onClick={analyzeBatch}
                disabled={isAnalyzingBatch}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: isAnalyzingBatch ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isAnalyzingBatch ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  width: '100%'
                }}
              >
                {isAnalyzingBatch ? '🔄 Analyzing Batch...' : `📊 Analyze ${selectedFiles.length} Images`}
              </button>
            )}
          </div>

          {/* Batch Results Section */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333' }}>
              📊 Batch Results
            </h2>
            
            {batchResults ? (
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #ddd' }}>
                {/* Batch Summary */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Batch Summary</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <strong>Total Images:</strong> {batchResults.total_images}
                    </div>
                    <div>
                      <strong>Processed:</strong> {batchResults.processed_images}
                    </div>
                    <div>
                      <strong>Avg Quality:</strong> 
                      <span style={{ 
                        color: getQualityColor(batchResults.average_quality_score),
                        fontWeight: 'bold',
                        marginLeft: '5px'
                      }}>
                        {batchResults.average_quality_score.toFixed(1)}
                      </span>
                    </div>
                    <div>
                      <strong>Processing Time:</strong> {batchResults.processing_time}
                    </div>
                  </div>
                </div>

                {/* Quality Distribution */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Quality Distribution</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(batchResults.quality_distribution).map(([category, count]) => (
                      <div key={category} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{category}:</span>
                        <span style={{ fontWeight: 'bold' }}>{count} images</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Defects */}
                {batchResults.common_defects.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Common Defects</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {batchResults.common_defects.map((defect, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '6px'
                        }}>
                          <span>{defect.defect_type}</span>
                          <span>{defect.occurrence_count} ({defect.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Batch Recommendations */}
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Batch Recommendations</h3>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {batchResults.batch_recommendations.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '5px', color: '#666' }}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '12px',
                color: '#666'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📦</div>
                <p>Upload multiple images and click "Analyze Batch" to see results</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisionAI;
