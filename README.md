# Movie Sentiment Prediction App

A full-stack web application for predicting movie review sentiment using machine learning. The app features a React.js frontend and a FastAPI backend serving three trained ML models (Logistic Regression, SVC, SGD) that analyze movie review text and metadata to predict positive or negative sentiment.

![App Demo](https://via.placeholder.com/800x400?text=Movie+Sentiment+Prediction+App)

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Real-time Predictions**: Instant sentiment analysis results
- **Multi-model Comparison**: View predictions from 3 different AI models
- **Interactive Visualization**: Confidence scores and model agreement analysis
- **Form Validation**: Comprehensive input validation with helpful error messages
- **Sample Data**: Quick-load buttons for testing with positive/negative examples
- **Mobile Responsive**: Optimized for all device sizes

### Backend (FastAPI)
- **Multiple ML Models**: LogisticRegression, SVC, and SGD classifiers
- **RESTful API**: Clean, documented API endpoints
- **Auto-training**: Models train automatically on first run
- **Health Monitoring**: Built-in health check endpoints
- **Swagger Documentation**: Interactive API documentation
- **Error Handling**: Comprehensive error responses and logging

### Machine Learning
- **Text Processing**: TF-IDF vectorization for text features
- **Feature Engineering**: Handles 9 different input features
- **Hyperparameter Tuning**: Optimized model parameters
- **Ensemble Prediction**: Majority voting from multiple models
- **Confidence Scoring**: Individual model confidence levels

## 🛠️ Tech Stack

- **Frontend**: React.js 18, Tailwind CSS, Axios, React Hook Form
- **Backend**: FastAPI, Python 3.8+, Pydantic, Uvicorn
- **ML**: Scikit-learn, Pandas, NumPy, Joblib
- **Testing**: Pytest (Backend), Jest (Frontend)

## 📋 Input Features

The application accepts 9 input features for sentiment prediction:

| Feature | Type | Required | Description |
|---------|------|----------|-------------|
| **Review Text** | Text | ✅ | Movie review content (main feature) |
| Movie Title | Text | ❌ | Name of the movie |
| Rating | Select | ❌ | Movie rating (G, PG, PG-13, R, etc.) |
| Genre | Select | ❌ | Movie genre (Action, Drama, etc.) |
| Reviewer Name | Text | ❌ | Name of the reviewer |
| Original Language | Select | ❌ | Original language of the movie |
| Distributor | Text | ❌ | Movie distribution company |
| Director | Text | ❌ | Movie director |
| Audience Score | Number | ❌ | Audience score (0-100) |

## 🚀 Quick Start

### Prerequisites

- **Backend**: Python 3.8+, pip
- **Frontend**: Node.js 16+, npm/yarn

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd movie-sentiment-prediction
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Set up the frontend** (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs

## 📖 Usage

### Using the Web Interface

1. **Open the app** at http://localhost:3000
2. **Fill in the review text** (required field)
3. **Optionally add movie details** for better predictions
4. **Click "Predict Sentiment"** to analyze
5. **View results** with confidence scores and model breakdown

### Using the API Directly

```bash
curl -X POST "http://localhost:8000/api/v1/predict" \
     -H "Content-Type: application/json" \
     -d '{
       "reviewText": "This movie was absolutely fantastic!",
       "title": "The Matrix",
       "genre": "Sci-Fi",
       "audienceScore": 87.5
     }'
```

### Example Response

```json
{
  "overall_prediction": "positive",
  "predictions": [
    {
      "model_name": "LogisticRegression",
      "prediction": "positive",
      "confidence": 0.85
    },
    {
      "model_name": "SVC",
      "prediction": "positive",
      "confidence": 0.78
    },
    {
      "model_name": "SGD",
      "prediction": "positive",
      "confidence": 0.82
    }
  ]
}
```

## 🏗️ Project Structure

```
movie-sentiment-prediction/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI app entry point
│   │   ├── models/         # ML model classes
│   │   ├── api/            # API routes
│   │   └── schemas/        # Pydantic models
│   ├── trained_models/     # Saved ML models
│   ├── requirements.txt
│   └── README.md
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client
│   │   ├── App.js         # Main app component
│   │   └── index.js       # React entry point
│   ├── package.json
│   └── README.md
├── tests/                  # Test suites
│   ├── backend/           # Backend tests
│   └── frontend/          # Frontend tests
├── docs/                   # Documentation
│   ├── PLANNING.md        # Project architecture
│   └── TASK.md           # Task tracking
└── README.md              # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pip install pytest pytest-asyncio
pytest tests/backend/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔧 Development

### API Endpoints

- `POST /api/v1/predict` - Predict sentiment
- `GET /api/v1/health` - Health check
- `GET /api/v1/models/info` - Model information
- `POST /api/v1/models/retrain` - Retrain models

### Environment Variables

**Frontend (.env)**:
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🚀 Deployment

**For detailed deployment instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**

### Quick Deployment

#### Backend to Google Cloud
```bash
cd backend

# Option 1: App Engine (Recommended)
./deploy.sh

# Option 2: Cloud Run (Containerized)
./deploy-cloud-run.sh
```

#### Frontend to Netlify
```bash
cd frontend
./deploy-netlify.sh
```

### Manual Deployment

#### Backend Deployment

1. **Google Cloud App Engine**:
   ```bash
   cd backend
   gcloud app deploy app.yaml
   ```

2. **Docker (Local/Cloud)**:
   ```bash
   cd backend
   docker build -t movie-sentiment-api .
   docker run -p 8000:8000 movie-sentiment-api
   ```

3. **Production Server**:
   ```bash
   pip install gunicorn
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

#### Frontend Deployment

1. **Netlify**:
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=build
   ```

2. **Build for production**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Serve static files** with any web server (nginx, Apache, etc.)

### Production Configuration

- **Backend**: Automatically configures CORS for production domains
- **Frontend**: Uses environment variables for API URL configuration
- **HTTPS**: Both platforms provide automatic SSL certificates
- **Scaling**: Auto-scaling configured for both platforms

## 📊 Model Performance

The application uses three machine learning models trained on movie review data:

- **Logistic Regression**: Fast, interpretable linear classifier
- **Support Vector Classifier**: Robust margin-based classifier  
- **Stochastic Gradient Descent**: Scalable online learning classifier

Each model provides predictions with confidence scores, and the final result uses majority voting for robustness.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or issues:

1. Check the [documentation](docs/)
2. Search existing [issues](../../issues)
3. Create a new issue if needed

## 🎯 Future Enhancements

- [ ] User authentication and history
- [ ] Batch prediction support
- [ ] Model performance analytics
- [ ] Additional ML models (BERT, etc.)
- [ ] Sentiment intensity scoring
- [ ] Multi-language support
- [ ] Real-time model retraining

---

**Built with ❤️ using FastAPI, React, and Scikit-learn** 