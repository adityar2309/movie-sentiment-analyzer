/**
 * Header component for the Movie Sentiment Prediction App.
 * 
 * Displays the app title, description, and navigation elements.
 */

import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-soft border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v8.5l4 4v-2a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1l-4-4H9l-4 4v1a1 1 0 01-1 1H1a1 1 0 01-1-1v-4a1 1 0 011-1h1a1 1 0 011 1v2l4-4V4H7z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Movie Sentiment Predictor
              </h1>
              <p className="text-sm text-gray-600">
                AI-powered movie review sentiment analysis
              </p>
            </div>
          </div>

          {/* Navigation/Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-success-500 rounded-full"></span>
              <span>AI Models Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle Bar */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-sm text-gray-700">
            Enter your movie review details below to get instant sentiment analysis using multiple AI models
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header; 