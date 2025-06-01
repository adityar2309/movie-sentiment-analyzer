# Movie Sentiment Prediction App - Project Planning

## Project Overview
A full-stack application for movie sentiment prediction using machine learning. Users can input movie review data and get real-time sentiment predictions.

## Architecture
- **Backend**: FastAPI (Python) serving ML model predictions
- **Frontend**: React.js with modern UI/UX design
- **ML Model**: Scikit-learn pipeline with preprocessing and multiple classifiers (LogReg, SVC, SGD)

## File Structure
```
project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── predictor.py     # ML model wrapper
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── routes.py        # API endpoints
│   │   └── schemas/
│   │       ├── __init__.py
│   │       └── prediction.py    # Pydantic models
│   ├── trained_models/          # Serialized ML models
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── ResultDisplay.jsx
│   │   │   └── Header.jsx
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── tests/
│   ├── backend/
│   └── frontend/
└── docs/
    ├── PLANNING.md
    ├── TASK.md
    └── README.md
```

## Features
### Input Fields (based on ML model requirements):
- **reviewText**: Main review text (required)
- **title**: Movie title
- **rating**: Movie rating
- **genre**: Movie genre
- **reviewerName**: Reviewer name
- **originalLanguage**: Original language
- **distributor**: Movie distributor
- **director**: Director name
- **audienceScore**: Audience score (numeric, 0-100)

### Output:
- Sentiment prediction (positive/negative)
- Confidence scores from multiple models
- Model comparison view

## Technology Stack
### Backend:
- FastAPI (API framework)
- Pydantic (data validation)
- Scikit-learn (ML pipeline)
- Joblib (model serialization)
- Uvicorn (ASGI server)

### Frontend:
- React.js 18+
- Axios (HTTP client)
- Tailwind CSS (styling)
- React Hook Form (form handling)

## Design Patterns
- **Component-based architecture** for React frontend
- **Repository pattern** for model loading and prediction
- **Service layer** for API communication
- **Validation layer** using Pydantic schemas

## Style Guidelines
- **Python**: PEP8, type hints, docstrings
- **JavaScript**: ES6+, functional components, hooks
- **CSS**: Tailwind utility classes, responsive design
- **API**: RESTful endpoints, JSON responses

## Development Workflow
1. Set up backend API with model serving
2. Create React frontend with form components
3. Implement API integration
4. Add comprehensive testing
5. Polish UI/UX and error handling

## Constraints
- Files must not exceed 500 lines
- Modular, reusable components
- Comprehensive error handling
- Responsive design for mobile/desktop 