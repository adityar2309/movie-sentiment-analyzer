/**
 * Main App component for Movie Sentiment Prediction.
 * 
 * This component orchestrates the entire application, managing state
 * and coordinating between the form, results, and API calls.
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import sentimentAPI from './services/api';
import './index.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiHealth, setApiHealth] = useState(null);

  // Check API health on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const health = await sentimentAPI.checkHealth();
        setApiHealth(health);
        console.log('API Health Check:', health);
      } catch (error) {
        console.error('API Health Check Failed:', error.message);
        setApiHealth({ status: 'unhealthy', message: error.message });
      }
    };

    checkApiHealth();
  }, []);

  const handlePredictionResult = (result) => {
    setPrediction(result);
    setError(null);
    console.log('Prediction result received:', result);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setPrediction(null);
  };

  const handleNewPrediction = () => {
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Status Indicator */}
        {apiHealth && (
          <div className="mb-6">
            <div className={`p-3 rounded-lg text-sm ${
              apiHealth.status === 'healthy' 
                ? 'bg-success-50 text-success-700 border border-success-200' 
                : 'bg-danger-50 text-danger-700 border border-danger-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  apiHealth.status === 'healthy' ? 'bg-success-500' : 'bg-danger-500'
                }`}></div>
                <span className="font-medium">
                  API Status: {apiHealth.status === 'healthy' ? 'Connected' : 'Disconnected'}
                </span>
                {apiHealth.message && (
                  <span>- {apiHealth.message}</span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            <PredictionForm
              onPredictionResult={handlePredictionResult}
              onError={handleError}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {/* Quick Actions */}
            {(prediction || error) && (
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {prediction ? 'Analysis complete!' : 'Error occurred'}
                  </span>
                  <button
                    onClick={handleNewPrediction}
                    className="btn-secondary text-sm"
                    disabled={isLoading}
                  >
                    New Analysis
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {(prediction || error) ? (
              <ResultDisplay prediction={prediction} error={error} />
            ) : (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready for Analysis
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Fill out the form on the left with your movie review details and click "Predict Sentiment" to get started.
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>3 AI Models</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    <span>Real-time Analysis</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Confidence Scores</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Movie Sentiment Prediction App - Powered by AI
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>FastAPI Backend</span>
              <span>•</span>
              <span>React Frontend</span>
              <span>•</span>
              <span>Scikit-learn Models</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

 