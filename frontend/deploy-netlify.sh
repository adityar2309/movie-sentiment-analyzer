#!/bin/bash

# Movie Sentiment Frontend - Netlify Deployment Script
# This script prepares and deploys the React frontend to Netlify

set -e  # Exit on any error

echo "🚀 Starting deployment to Netlify..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install it first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install Node.js which includes npm."
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Prompt for backend URL
echo "🔧 Please provide your backend URL (deployed on Google Cloud):"
read -p "Backend URL (e.g., https://your-project.appspot.com): " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Error: Backend URL is required"
    exit 1
fi

# Update environment variable
echo "📝 Setting up environment variables..."
cat > .env.production << EOF
REACT_APP_API_URL=$BACKEND_URL
REACT_APP_ENVIRONMENT=production
EOF

echo "✅ Environment variables configured:"
echo "   REACT_APP_API_URL=$BACKEND_URL"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️  Building the project..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Error: Build failed. No build directory found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Login to Netlify (if not already logged in)
echo "🔐 Checking Netlify authentication..."
if ! netlify status &> /dev/null; then
    echo "🔑 Please log in to Netlify..."
    netlify login
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
echo "   This will deploy your built React app to Netlify."
echo "   You can either deploy to an existing site or create a new one."

netlify deploy --prod --dir=build

echo "✅ Deployment completed successfully!"
echo ""
echo "🎉 Your frontend is now live on Netlify!"
echo "📚 Next steps:"
echo "   1. Note down your Netlify URL"
echo "   2. Update your backend CORS settings if needed"
echo "   3. Test the full application end-to-end"
echo ""
echo "🔧 To set up a custom domain:"
echo "   netlify domains:add your-domain.com" 