# Deployment Guide - Movie Sentiment Prediction App

This guide walks you through deploying the Movie Sentiment Prediction App to production using Google Cloud Platform for the backend and Netlify for the frontend.

## Overview

- **Backend**: FastAPI application deployed to Google Cloud (App Engine or Cloud Run)
- **Frontend**: React application deployed to Netlify
- **Architecture**: RESTful API with CORS configured for cross-origin requests

## Prerequisites

### Required Tools
1. **Google Cloud CLI** - [Install here](https://cloud.google.com/sdk/docs/install)
2. **Node.js & npm** - [Install here](https://nodejs.org/)
3. **Netlify CLI** - Will be installed automatically by the script
4. **Git** - For version control

### Required Accounts
1. **Google Cloud Platform** account with billing enabled
2. **Netlify** account (free tier available)

## Backend Deployment (Google Cloud)

### Option 1: Google App Engine (Recommended)

App Engine is a fully managed platform that automatically handles scaling, load balancing, and infrastructure management.

#### Steps:

1. **Authenticate with Google Cloud**:
   ```bash
   gcloud auth login
   ```

2. **Set your project ID**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

4. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

   The script will:
   - Verify prerequisites
   - Deploy to App Engine
   - Test the deployment
   - Provide you with the API URL

#### Manual Deployment:
If you prefer manual deployment:
```bash
cd backend
gcloud app deploy app.yaml
```

### Option 2: Google Cloud Run (Alternative)

Cloud Run offers more control and supports containerized deployments.

#### Steps:

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Run the Cloud Run deployment script**:
   ```bash
   ./deploy-cloud-run.sh
   ```

   The script will:
   - Enable required APIs
   - Build and deploy the container
   - Configure the service
   - Provide you with the API URL

#### Manual Deployment:
```bash
cd backend
gcloud run deploy movie-sentiment-api \
    --source . \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated
```

### Backend Configuration

The backend automatically:
- Configures CORS for Netlify domains
- Sets up health checks
- Handles environment-based configuration
- Serves the API documentation at `/docs`

### Testing Backend Deployment

Once deployed, test your backend:

1. **Health Check**:
   ```bash
   curl https://YOUR_BACKEND_URL/health
   ```

2. **API Documentation**:
   Visit `https://YOUR_BACKEND_URL/docs` in your browser

3. **Sample Prediction**:
   ```bash
   curl -X POST "https://YOUR_BACKEND_URL/api/v1/predict" \
     -H "Content-Type: application/json" \
     -d '{
       "reviewText": "This movie was absolutely amazing!",
       "title": "Sample Movie",
       "audienceScore": 85
     }'
   ```

## Frontend Deployment (Netlify)

### Automated Deployment

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy-netlify.sh
   ```

   The script will:
   - Check prerequisites
   - Ask for your backend URL
   - Configure environment variables
   - Build the React app
   - Deploy to Netlify
   - Provide you with the frontend URL

### Manual Deployment

If you prefer manual deployment:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Create environment file**:
   ```bash
   echo "REACT_APP_API_URL=https://your-backend-url" > .env.production
   ```

4. **Build the app**:
   ```bash
   npm install
   npm run build
   ```

5. **Deploy**:
   ```bash
   netlify deploy --prod --dir=build
   ```

### Environment Variables

The frontend uses these environment variables:
- `REACT_APP_API_URL`: Your backend URL from Google Cloud
- `REACT_APP_ENVIRONMENT`: Set to "production"

### Netlify Configuration

The `netlify.toml` file automatically configures:
- Build settings
- Redirects for React Router
- Security headers
- Caching policies

## Post-Deployment Configuration

### 1. Update CORS Settings

If you get CORS errors, update the backend's CORS configuration in `backend/app/main.py`:

```python
# Add your specific Netlify domain
base_origins.extend([
    "https://your-app-name.netlify.app",
    "https://your-custom-domain.com"
])
```

Then redeploy the backend.

### 2. Custom Domain (Optional)

#### For Netlify:
```bash
netlify domains:add your-domain.com
```

#### For Google Cloud:
Follow the [custom domain guide](https://cloud.google.com/appengine/docs/standard/mapping-custom-domains).

### 3. HTTPS Setup

Both platforms automatically provide HTTPS:
- **Google Cloud**: Automatic SSL certificates
- **Netlify**: Free SSL certificates via Let's Encrypt

## Monitoring and Maintenance

### Backend Monitoring

1. **View logs**:
   ```bash
   # App Engine
   gcloud logs tail -s default
   
   # Cloud Run
   gcloud logs tail -s movie-sentiment-api
   ```

2. **Monitor metrics** in Google Cloud Console

### Frontend Monitoring

1. **View logs** in Netlify dashboard
2. **Monitor performance** with Netlify Analytics

### Updating the Application

#### Backend Updates:
```bash
cd backend
./deploy.sh  # or ./deploy-cloud-run.sh
```

#### Frontend Updates:
```bash
cd frontend
./deploy-netlify.sh
```

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend CORS includes your Netlify domain
   - Check environment variables in frontend

2. **Build Failures**:
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed

3. **API Connection Issues**:
   - Verify backend URL in frontend environment
   - Check backend health endpoint

4. **Model Loading Errors**:
   - Ensure all model files are included in deployment
   - Check backend logs for detailed errors

### Getting Help

1. **Backend Issues**: Check Google Cloud logs
2. **Frontend Issues**: Check Netlify build logs
3. **Network Issues**: Use browser developer tools

## Cost Optimization

### Google Cloud
- App Engine: Automatic scaling, pay-per-use
- Cloud Run: Pay only when processing requests
- Use the free tier for development/testing

### Netlify
- Free tier includes 100GB bandwidth/month
- Automatic CDN and global distribution

## Security Considerations

1. **API Security**:
   - Input validation via Pydantic
   - Rate limiting (can be added)
   - HTTPS enforced

2. **Frontend Security**:
   - Security headers configured
   - No sensitive data in client-side code
   - Environment variables for configuration

3. **CORS Policy**:
   - Restricted to specific domains
   - No wildcard origins in production

## Backup and Recovery

1. **Code**: Version controlled in Git
2. **Models**: Stored in repository and deployed
3. **Configuration**: Documented in this guide

This completes the deployment setup for your Movie Sentiment Prediction App! 