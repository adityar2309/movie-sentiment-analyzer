"""
Unit tests for the SentimentPredictor class.

This module tests the core ML model functionality including
preprocessing, training, and prediction capabilities.
"""

import pytest
import pandas as pd
import numpy as np
from unittest.mock import Mock, patch

# Assuming the backend code is in the path
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../backend'))

from app.models.predictor import SentimentPredictor


class TestSentimentPredictor:
    """Test cases for the SentimentPredictor class."""
    
    @pytest.fixture
    def predictor(self):
        """Create a SentimentPredictor instance for testing."""
        return SentimentPredictor()
    
    def test_initialization(self, predictor):
        """Test that predictor initializes correctly."""
        assert predictor is not None
        assert predictor.preprocessor is not None
        assert len(predictor.numeric_features) == 1
        assert len(predictor.categorical_features) == 8
        assert predictor.is_trained is False
        assert len(predictor.models) == 0
    
    def test_create_mock_training_data(self, predictor):
        """Test mock training data creation."""
        X_train, y_train = predictor._create_mock_training_data()
        
        assert isinstance(X_train, pd.DataFrame)
        assert isinstance(y_train, np.ndarray)
        assert len(X_train) == 4
        assert len(y_train) == 4
        assert len(X_train.columns) == 9  # All expected features
    
    def test_prepare_input_data(self, predictor):
        """Test input data preparation."""
        input_data = {
            'reviewText': 'Great movie!',
            'title': 'Test Movie',
            'audienceScore': 85.0
        }
        
        df = predictor._prepare_input_data(input_data)
        
        assert isinstance(df, pd.DataFrame)
        assert len(df) == 1
        assert df['reviewText'].iloc[0] == 'Great movie!'
        assert df['title'].iloc[0] == 'Test Movie'
        assert df['audienceScore'].iloc[0] == 85.0
    
    def test_prepare_input_data_missing_fields(self, predictor):
        """Test input data preparation with missing optional fields."""
        input_data = {
            'reviewText': 'Great movie!'
        }
        
        df = predictor._prepare_input_data(input_data)
        
        assert isinstance(df, pd.DataFrame)
        assert len(df) == 1
        assert df['reviewText'].iloc[0] == 'Great movie!'
        assert df['title'].iloc[0] == ""  # Should default to empty string
        assert df['audienceScore'].iloc[0] == 0.0  # Should default to 0.0
    
    def test_train_models(self, predictor):
        """Test model training functionality."""
        # This is a basic test - in practice you might mock the training
        predictor.train_models()
        
        assert predictor.is_trained is True
        assert len(predictor.models) == 3  # LogReg, SVC, SGD
        assert 'LogisticRegression' in predictor.models
        assert 'SVC' in predictor.models
        assert 'SGD' in predictor.models
    
    def test_predict_single_without_training(self, predictor):
        """Test that prediction fails when models aren't trained."""
        input_data = {'reviewText': 'Great movie!'}
        
        with pytest.raises(ValueError, match="Models must be trained"):
            predictor.predict_single(input_data)
    
    def test_predict_single_after_training(self, predictor):
        """Test prediction functionality after training."""
        # Train the models first
        predictor.train_models()
        
        input_data = {
            'reviewText': 'This movie was absolutely fantastic!',
            'title': 'Test Movie',
            'audienceScore': 85.0
        }
        
        result = predictor.predict_single(input_data)
        
        assert isinstance(result, dict)
        assert 'predictions' in result
        assert 'confidences' in result
        assert len(result['predictions']) == 3
        assert len(result['confidences']) == 3
        
        # Check that all predictions are valid sentiments
        for prediction in result['predictions'].values():
            assert prediction in ['positive', 'negative', 'unknown']
    
    @patch('joblib.dump')
    def test_save_models(self, mock_dump, predictor):
        """Test model saving functionality."""
        predictor.train_models()
        predictor.save_models('test_dir')
        
        # Should call joblib.dump for each model
        assert mock_dump.call_count == 3
    
    def test_save_models_without_training(self, predictor):
        """Test that saving fails when models aren't trained."""
        with pytest.raises(ValueError, match="Models must be trained before saving"):
            predictor.save_models()


if __name__ == '__main__':
    pytest.main([__file__]) 