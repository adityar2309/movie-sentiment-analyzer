/**
 * API service for movie sentiment prediction.
 * 
 * This module handles all HTTP requests to the FastAPI backend,
 * providing a clean interface for the React components.
 */

import axios from 'axios';

// Configure axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 30000, // 30 seconds timeout for model predictions
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 422) {
      // Validation error
      const validationErrors = error.response.data.detail || [];
      const errorMessage = validationErrors
        .map(err => `${err.loc?.join('.')}: ${err.msg}`)
        .join(', ');
      error.message = `Validation Error: ${errorMessage}`;
    } else if (error.response?.status === 500) {
      error.message = 'Server Error: Please try again later';
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout: The prediction is taking too long';
    } else if (!error.response) {
      error.message = 'Network Error: Cannot connect to the server';
    }
    
    return Promise.reject(error);
  }
);

/**
 * API service class for sentiment prediction operations.
 */
class SentimentAPI {
  /**
   * Check if the API is healthy and responsive.
   * 
   * @returns {Promise<Object>} Health status response
   */
  async checkHealth() {
    try {
      const response = await api.get('/api/v1/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }

  /**
   * Get information about available models.
   * 
   * @returns {Promise<Object>} Model information
   */
  async getModelInfo() {
    try {
      const response = await api.get('/api/v1/models/info');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get model info: ${error.message}`);
    }
  }

  /**
   * Predict sentiment for a movie review.
   * 
   * @param {Object} reviewData - The movie review data
   * @param {string} reviewData.reviewText - The review text (required)
   * @param {string} [reviewData.title] - Movie title
   * @param {string} [reviewData.rating] - Movie rating
   * @param {string} [reviewData.genre] - Movie genre
   * @param {string} [reviewData.reviewerName] - Reviewer name
   * @param {string} [reviewData.originalLanguage] - Original language
   * @param {string} [reviewData.distributor] - Movie distributor
   * @param {string} [reviewData.director] - Movie director
   * @param {number} [reviewData.audienceScore] - Audience score (0-100)
   * @returns {Promise<Object>} Prediction results
   */
  async predictSentiment(reviewData) {
    try {
      // Validate required fields
      if (!reviewData.reviewText || reviewData.reviewText.trim() === '') {
        throw new Error('Review text is required');
      }

      // Clean and prepare data
      const cleanData = {
        reviewText: reviewData.reviewText.trim(),
        title: reviewData.title?.trim() || null,
        rating: reviewData.rating?.trim() || null,
        genre: reviewData.genre?.trim() || null,
        reviewerName: reviewData.reviewerName?.trim() || null,
        originalLanguage: reviewData.originalLanguage?.trim() || null,
        distributor: reviewData.distributor?.trim() || null,
        director: reviewData.director?.trim() || null,
        audienceScore: reviewData.audienceScore ? parseFloat(reviewData.audienceScore) : null,
      };

      console.log('Sending prediction request with data:', cleanData);

      const response = await api.post('/api/v1/predict', cleanData);
      return response.data;
    } catch (error) {
      throw new Error(`Prediction failed: ${error.message}`);
    }
  }

  /**
   * Retrain all models (development use only).
   * 
   * @returns {Promise<Object>} Retrain status
   */
  async retrainModels() {
    try {
      const response = await api.post('/api/v1/models/retrain');
      return response.data;
    } catch (error) {
      throw new Error(`Model retraining failed: ${error.message}`);
    }
  }
}

// Export singleton instance
const sentimentAPI = new SentimentAPI();
export default sentimentAPI;

// Export class for testing
export { SentimentAPI }; 