# ATF Weather ChatBot - Frontend

A modern, AI-powered weather chatbot with Japanese and English voice recognition capabilities.

## 🌟 Features

### Core Functionality
- **Voice Recognition**: Support for both Japanese (ja-JP) and English (en-US) speech input
- **Real-time Weather**: Live weather data from OpenWeatherMap API
- **AI Recommendations**: Personalized activity suggestions based on weather conditions
- **Bilingual Support**: Seamless switching between Japanese and English
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Interface
- **Modern Dark Theme**: Beautiful gradient backgrounds with dark grey and red accents
- **Animated Components**: Smooth transitions and micro-interactions using Framer Motion
- **Chat Interface**: WhatsApp-style chat bubbles with message history
- **Weather Cards**: Visual weather display with icons and forecasts
- **Settings Panel**: Customizable preferences and system configuration

### Technical Features
- **Error Boundary**: Graceful error handling with recovery options
- **System Status**: Real-time monitoring of API services and connectivity
- **Loading States**: Beautiful loading animations for different operations
- **Offline Support**: Graceful degradation when services are unavailable
- **Local Storage**: Persistent user settings and preferences

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── ActivitySuggestions.tsx    # AI recommendation display
│   ├── AIResponse.tsx             # AI response formatting
│   ├── ChatInterface.tsx          # Main chat component
│   ├── ErrorBoundary.tsx          # Error handling wrapper
│   ├── LanguageToggle.tsx         # Language switching
│   ├── LoadingSpinner.tsx         # Loading animations
│   ├── SettingsPanel.tsx          # User preferences
│   ├── SystemStatus.tsx           # Service monitoring
│   ├── VoiceInput.tsx             # Speech recognition
│   └── WeatherCard.tsx            # Weather display
├── hooks/
│   └── useSpeechRecognition.ts    # Speech recognition hook
├── services/
│   └── api.ts                     # API communication
├── types/
│   └── index.ts                   # TypeScript definitions
├── utils/
│   └── locationExtractor.ts       # Location parsing
└── App.tsx                        # Main application
```

### Key Components

#### 1. ChatInterface
- Main chat area with message history
- Voice input integration
- Weather and AI response display
- Real-time loading states

#### 2. VoiceInput
- Microphone button with visual feedback
- Language selection (Japanese/English)
- Real-time transcription display
- Error handling for speech recognition

#### 3. WeatherCard
- Beautiful weather visualization
- Temperature, humidity, wind speed
- 5-day forecast display
- Dynamic weather icons

#### 4. ActivitySuggestions
- AI-powered recommendations
- Categorized suggestions (travel, clothing, food, etc.)
- Priority-based sorting
- Reasoning explanations

#### 5. SystemStatus
- Real-time service monitoring
- API response time tracking
- Network connectivity status
- Service health indicators

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradients (#3B82F6 to #1E40AF)
- **Secondary**: Purple gradients (#8B5CF6 to #6D28D9)
- **Background**: Dark grey gradients (#1F2937 to #111827)
- **Accent**: Red highlights for interactive elements
- **Text**: White and light grey for contrast

### Typography
- **Primary Font**: Inter (system fallback)
- **Japanese Font**: Noto Sans JP
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Animations
- **Page Load**: Staggered component animations
- **Voice Input**: Pulsing microphone with recording indicator
- **Weather Cards**: Smooth slide-in transitions
- **Loading States**: Contextual loading animations
- **Error States**: Gentle error message animations

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_AI_API_KEY=your_gemini_api_key
```

### Settings
Users can configure:
- **Language**: Japanese or English interface
- **Voice Input**: Enable/disable speech recognition
- **Sound Effects**: Audio feedback toggle
- **Theme**: Light or dark mode (dark is default)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with Web Speech API support

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Browser Support
- **Chrome**: Full support (recommended)
- **Edge**: Full support
- **Firefox**: Limited speech recognition
- **Safari**: Limited speech recognition

## 🎯 Usage

### Voice Commands
- **Weather Queries**: "What's the weather in Tokyo?" / "東京の天気は？"
- **Location Requests**: "Tell me about the weather in New York"
- **General Questions**: "Should I bring an umbrella?" / "傘を持って行くべき？"

### Text Input
- Type any weather-related question
- Supports both English and Japanese text
- Location extraction from natural language

### Settings
- Click the settings icon in the header
- Adjust language, voice, and theme preferences
- Changes are saved automatically

## 🔍 Troubleshooting

### Common Issues

#### Speech Recognition Not Working
- Check browser compatibility (Chrome recommended)
- Ensure microphone permissions are granted
- Verify HTTPS connection (required for speech API)

#### Weather Data Not Loading
- Check internet connection
- Verify API keys are configured
- Check system status in sidebar

#### AI Suggestions Not Appearing
- Ensure AI service is running
- Check API key configuration
- Weather data must load first

### Error Messages
- **"Speech recognition not supported"**: Use Chrome or Edge browser
- **"Microphone permission denied"**: Grant microphone access in browser settings
- **"Failed to fetch weather data"**: Check internet connection and API keys
- **"AI service temporarily unavailable"**: AI service is down, weather data still works

## 🧪 Testing

### Manual Testing
- Test voice input in both languages
- Verify weather data for different cities
- Check responsive design on mobile
- Test error scenarios (offline, API failures)

### Browser Testing
- Chrome: Full functionality
- Edge: Full functionality  
- Firefox: Limited speech recognition
- Safari: Limited speech recognition

## 📱 Mobile Support

### Responsive Design
- Sidebar collapses on mobile
- Touch-friendly buttons and inputs
- Optimized chat interface
- Swipe gestures for navigation

### PWA Features
- Installable as web app
- Offline functionality
- Push notifications (future)
- App-like experience

## 🔮 Future Enhancements

### Planned Features
- **Push Notifications**: Weather alerts and reminders
- **Location History**: Remember frequently asked locations
- **Voice Synthesis**: Text-to-speech responses
- **Weather Maps**: Interactive weather visualization
- **Social Sharing**: Share weather and recommendations
- **Themes**: Additional color schemes and customization

### Technical Improvements
- **Caching**: Improved offline support
- **Performance**: Code splitting and lazy loading
- **Accessibility**: Enhanced screen reader support
- **Testing**: Automated test suite
- **Analytics**: Usage tracking and insights

## 🤝 Contributing

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations
- Test on multiple browsers

### Code Style
- Use functional components with hooks
- Implement proper TypeScript types
- Follow React best practices
- Use meaningful component names
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Ashish Prasad**
- AI-Powered Weather Assistant
- Modern React TypeScript Application
- Voice Recognition & AI Integration