/**
 * ResultDisplay component for showing sentiment prediction results.
 * 
 * This component displays the prediction results from multiple models,
 * including overall sentiment, individual model predictions, and confidence scores.
 */

import React from 'react';

const ResultDisplay = ({ prediction, error }) => {
  if (error) {
    return (
      <div className="card p-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-danger-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-danger-900">Prediction Error</h3>
            <p className="text-sm text-danger-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return null;
  }

  const getSentimentColor = (sentiment) => {
    return sentiment === 'positive' ? 'success' : 'danger';
  };

  const getSentimentIcon = (sentiment) => {
    if (sentiment === 'positive') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 1.414 3 3 0 004.242 0 1 1 0 001.415-1.414 5 5 0 00-7.072 0z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'success';
    if (confidence >= 0.6) return 'primary';
    return 'danger';
  };

  const overallColor = getSentimentColor(prediction.overall_prediction);

  return (
    <div className="space-y-6">
      {/* Overall Result */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Prediction Result</h2>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-${overallColor}-100`}>
            <span className={`text-${overallColor}-600`}>
              {getSentimentIcon(prediction.overall_prediction)}
            </span>
            <span className={`text-sm font-medium text-${overallColor}-800 capitalize`}>
              {prediction.overall_prediction}
            </span>
          </div>
        </div>

        {/* Overall Sentiment Display */}
        <div className={`p-4 rounded-lg bg-${overallColor}-50 border border-${overallColor}-200`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-${overallColor}-100`}>
              <span className={`text-${overallColor}-600`}>
                {getSentimentIcon(prediction.overall_prediction)}
              </span>
            </div>
            <div>
              <h3 className={`text-lg font-medium text-${overallColor}-900 capitalize`}>
                {prediction.overall_prediction} Sentiment
              </h3>
              <p className={`text-sm text-${overallColor}-700`}>
                Based on analysis from {prediction.predictions.length} AI models
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Model Results */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Analysis Breakdown</h3>
        <div className="space-y-4">
          {prediction.predictions.map((modelPred, index) => {
            const sentimentColor = getSentimentColor(modelPred.prediction);
            const confidenceColor = getConfidenceColor(modelPred.confidence);
            const confidenceLevel = getConfidenceLevel(modelPred.confidence);
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-${sentimentColor}-500`}></div>
                    <h4 className="font-medium text-gray-900">{modelPred.model_name}</h4>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium bg-${sentimentColor}-100 text-${sentimentColor}-800 capitalize`}>
                    {modelPred.prediction}
                  </div>
                </div>
                
                {/* Confidence Score */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Confidence Score:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-${confidenceColor}-500`}
                        style={{ width: `${modelPred.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium text-${confidenceColor}-600`}>
                      {(modelPred.confidence * 100).toFixed(1)}%
                    </span>
                    <span className={`text-xs px-2 py-1 rounded bg-${confidenceColor}-100 text-${confidenceColor}-700`}>
                      {confidenceLevel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Summary */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Input Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Review Text:</span>
              <p className="text-gray-600 mt-1 line-clamp-3">
                "{prediction.input_data.reviewText}"
              </p>
            </div>
            {prediction.input_data.title && (
              <div>
                <span className="font-medium text-gray-700">Movie:</span>
                <p className="text-gray-600 mt-1">{prediction.input_data.title}</p>
              </div>
            )}
            {prediction.input_data.genre && (
              <div>
                <span className="font-medium text-gray-700">Genre:</span>
                <p className="text-gray-600 mt-1">{prediction.input_data.genre}</p>
              </div>
            )}
            {prediction.input_data.audienceScore && (
              <div>
                <span className="font-medium text-gray-700">Audience Score:</span>
                <p className="text-gray-600 mt-1">{prediction.input_data.audienceScore}/100</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Model Agreement Analysis */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Agreement</h3>
        <div className="grid grid-cols-2 gap-4">
          {(() => {
            const positiveCount = prediction.predictions.filter(p => p.prediction === 'positive').length;
            const negativeCount = prediction.predictions.filter(p => p.prediction === 'negative').length;
            const totalModels = prediction.predictions.length;
            const agreement = Math.max(positiveCount, negativeCount) / totalModels;
            
            return (
              <>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600">{positiveCount}</div>
                  <div className="text-sm text-gray-600">Positive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-danger-600">{negativeCount}</div>
                  <div className="text-sm text-gray-600">Negative</div>
                </div>
                <div className="col-span-2 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Agreement Level:</span>
                    <span className={`text-sm font-medium ${agreement >= 0.8 ? 'text-success-600' : agreement >= 0.6 ? 'text-primary-600' : 'text-danger-600'}`}>
                      {(agreement * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${agreement >= 0.8 ? 'bg-success-500' : agreement >= 0.6 ? 'bg-primary-500' : 'bg-danger-500'}`}
                      style={{ width: `${agreement * 100}%` }}
                    ></div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;