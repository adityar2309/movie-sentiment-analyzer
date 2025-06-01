# Movie Sentiment Prediction Frontend

A modern React.js frontend application for movie sentiment prediction. This interface allows users to input movie review details and get real-time sentiment analysis from multiple AI models.

## Features

- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS
- **Real-time Predictions**: Instant sentiment analysis results
- **Multi-model Comparison**: View predictions from 3 different AI models
- **Confidence Visualization**: Interactive confidence score displays
- **Form Validation**: Comprehensive input validation with helpful error messages
- **Sample Data**: Quick-load buttons for testing with positive/negative examples
- **Mobile Responsive**: Optimized for desktop and mobile devices
- **API Health Monitoring**: Real-time connection status with backend

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn package manager

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Access the application**:
   - Frontend URL: http://localhost:3000
   - Ensure backend is running on http://localhost:8000

### Build for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
frontend/
├── public/
│   ├── index.html           # Main HTML template
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.jsx       # App header with branding
│   │   ├── PredictionForm.jsx  # Main input form
│   │   └── ResultDisplay.jsx   # Results visualization
│   ├── services/
│   │   └── api.js           # API communication layer
│   ├── App.js               # Main application component
│   ├── index.js             # React app entry point
│   └── index.css            # Global styles and Tailwind
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json
└── README.md
```

## Components

### Header
- Application branding and navigation
- Real-time API status indicator
- Responsive design for mobile/desktop

### PredictionForm
- Comprehensive form with 9 input fields
- Real-time validation and error handling
- Sample data loading for quick testing
- Character counter for review text
- Loading states and user feedback

### ResultDisplay
- Overall sentiment prediction with visual indicators
- Individual model breakdown with confidence scores
- Model agreement analysis
- Input data summary
- Interactive confidence visualizations

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Review Text | textarea | ✅ | Movie review content (10-1000 chars) |
| Movie Title | text | ❌ | Name of the movie |
| Rating | select | ❌ | Movie rating (G, PG, PG-13, R, NC-17) |
| Genre | select | ❌ | Movie genre (Action, Drama, etc.) |
| Reviewer Name | text | ❌ | Name of the person reviewing |
| Original Language | select | ❌ | Original language of the movie |
| Distributor | text | ❌ | Movie distribution company |
| Director | text | ❌ | Movie director |
| Audience Score | number | ❌ | Audience score (0-100) |

## API Integration

The frontend communicates with the FastAPI backend through a dedicated service layer (`services/api.js`) that handles:

- HTTP request/response management
- Error handling and user-friendly messages
- Request timeouts and retry logic
- API health monitoring
- Data validation and cleaning

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

## Styling

The application uses Tailwind CSS for styling with a custom design system:

### Color Palette
- **Primary**: Blue shades for main UI elements
- **Success**: Green shades for positive sentiment
- **Danger**: Red shades for negative sentiment
- **Gray**: Neutral colors for text and backgrounds

### Components
- **Cards**: Elevated containers with soft shadows
- **Buttons**: Consistent button styles with hover states
- **Forms**: Styled inputs with focus states and validation
- **Responsive**: Mobile-first responsive design

## Features

### Sample Data Loading
- **Positive Sample**: Pre-filled positive movie review
- **Negative Sample**: Pre-filled negative movie review
- Quick testing without manual data entry

### Real-time Validation
- Review text character limits (10-1000 characters)
- Audience score range validation (0-100)
- Required field indicators
- Inline error messages

### Results Visualization
- **Overall Prediction**: Prominent display of final sentiment
- **Model Breakdown**: Individual model predictions with confidence
- **Agreement Analysis**: Visual representation of model consensus
- **Confidence Bars**: Interactive progress bars for confidence scores

### Error Handling
- Network error messages
- API timeout handling
- Validation error display
- Graceful degradation

## Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

### Code Style

- **ES6+**: Modern JavaScript features
- **Functional Components**: React hooks-based architecture
- **JSX**: Component-based UI development
- **Responsive**: Mobile-first design approach

### Testing

```bash
# Run component tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Bundle Size**: Optimized with code splitting
- **Loading**: Fast initial load with lazy loading
- **API Calls**: Efficient request handling with timeouts
- **Responsive**: Smooth performance on mobile devices

## Accessibility

- **Semantic HTML**: Proper heading structure and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant color ratios

## License

MIT License - see LICENSE file for details. 