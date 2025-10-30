/**
 * PredictionForm component for movie review sentiment prediction.
 * 
 * This component provides a comprehensive form for inputting movie review data
 * and submitting it for sentiment analysis.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import sentimentAPI from '../services/api';

const PredictionForm = ({ onPredictionResult, onError, isLoading, setIsLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      reviewText: '',
      title: '',
      rating: '',
      genre: '',
      reviewerName: '',
      originalLanguage: '',
      distributor: '',
      director: '',
      audienceScore: ''
    }
  });

  // Sample data for quick testing
  const loadSampleData = () => {
    reset({
      reviewText: "This movie was absolutely fantastic! The acting was superb, the plot was engaging, and the special effects were mind-blowing. I couldn't take my eyes off the screen for a single moment. Highly recommended for anyone who loves great cinema!",
      title: "The Matrix",
      rating: "R",
      genre: "Sci-Fi",
      reviewerName: "MovieLover123",
      originalLanguage: "English",
      distributor: "Warner Bros",
      director: "The Wachowskis",
      audienceScore: "87"
    });
  };

  const loadNegativeSample = () => {
    reset({
      reviewText: "This was one of the worst movies I've ever seen. The plot made no sense, the acting was terrible, and it felt like a complete waste of time. I walked out halfway through and I regret not leaving sooner.",
      title: "Bad Movie",
      rating: "PG-13",
      genre: "Drama",
      reviewerName: "CriticReviewer",
      originalLanguage: "English",
      distributor: "Universal",
      director: "Unknown Director",
      audienceScore: "23"
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    onError(null); // Clear previous errors

    try {
      console.log('Submitting form data:', data);
      const result = await sentimentAPI.predictSentiment(data);
      onPredictionResult(result);
    } catch (error) {
      console.error('Prediction error:', error);
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Watch review text for character count
  const reviewText = watch('reviewText');

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Movie Review Details</h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details below. Only review text is required.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={loadSampleData}
            className="btn-secondary text-xs"
            disabled={isLoading}
          >
            Load Positive Sample
          </button>
          <button
            type="button"
            onClick={loadNegativeSample}
            className="btn-secondary text-xs"
            disabled={isLoading}
          >
            Load Negative Sample
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Review Text - Required */}
        <div>
          <label htmlFor="reviewText" className="label">
            Review Text *
          </label>
          <div className="relative">
            <textarea
              id="reviewText"
              rows="4"
              className={`input-field resize-none ${errors.reviewText ? 'border-danger-500 focus:ring-danger-500' : ''}`}
              placeholder="Enter the movie review text here..."
              {...register('reviewText', {
                required: 'Review text is required',
                minLength: {
                  value: 10,
                  message: 'Review text must be at least 10 characters long'
                },
                maxLength: {
                  value: 1000,
                  message: 'Review text must be less than 1000 characters'
                }
              })}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {reviewText?.length || 0}/1000
            </div>
          </div>
          {errors.reviewText && (
            <p className="error-text">{errors.reviewText.message}</p>
          )}
        </div>

        {/* Grid for other fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Movie Title */}
          <div>
            <label htmlFor="title" className="label">Movie Title</label>
            <input
              id="title"
              type="text"
              className="input-field"
              placeholder="e.g., The Matrix"
              {...register('title')}
            />
          </div>

          {/* Movie Rating */}
          <div>
            <label htmlFor="rating" className="label">Movie Rating</label>
            <select
              id="rating"
              className="input-field"
              {...register('rating')}
            >
              <option value="">Select rating...</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
              <option value="Not Rated">Not Rated</option>
            </select>
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="label">Genre</label>
            <select
              id="genre"
              className="input-field"
              {...register('genre')}
            >
              <option value="">Select genre...</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Documentary">Documentary</option>
              <option value="Animation">Animation</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>

          {/* Reviewer Name */}
          <div>
            <label htmlFor="reviewerName" className="label">Reviewer Name</label>
            <input
              id="reviewerName"
              type="text"
              className="input-field"
              placeholder="e.g., John Doe"
              {...register('reviewerName')}
            />
          </div>

          {/* Original Language */}
          <div>
            <label htmlFor="originalLanguage" className="label">Original Language</label>
            <select
              id="originalLanguage"
              className="input-field"
              {...register('originalLanguage')}
            >
              <option value="">Select language...</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Mandarin">Mandarin</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Distributor */}
          <div>
            <label htmlFor="distributor" className="label">Distributor</label>
            <input
              id="distributor"
              type="text"
              className="input-field"
              placeholder="e.g., Warner Bros"
              {...register('distributor')}
            />
          </div>

          {/* Director */}
          <div>
            <label htmlFor="director" className="label">Director</label>
            <input
              id="director"
              type="text"
              className="input-field"
              placeholder="e.g., Christopher Nolan"
              {...register('director')}
            />
          </div>

          {/* Audience Score */}
          <div>
            <label htmlFor="audienceScore" className="label">
              Audience Score (0-100)
            </label>
            <input
              id="audienceScore"
              type="number"
              min="0"
              max="100"
              step="0.1"
              className={`input-field ${errors.audienceScore ? 'border-danger-500 focus:ring-danger-500' : ''}`}
              placeholder="e.g., 85.5"
              {...register('audienceScore', {
                min: {
                  value: 0,
                  message: 'Audience score must be between 0 and 100'
                },
                max: {
                  value: 100,
                  message: 'Audience score must be between 0 and 100'
                }
              })}
            />
            {errors.audienceScore && (
              <p className="error-text">{errors.audienceScore.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-secondary"
            disabled={isLoading}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="btn-primary px-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              'Predict Sentiment'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm; 