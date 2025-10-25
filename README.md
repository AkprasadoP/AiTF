# ATF Weather Assistant 🌤️

> Your personal AI weather companion — blending forecasts, fashion, and travel advice seamlessly.

## 🌟 Overview

ATF Weather Assistant is an intelligent weather chatbot that combines real-time weather data with AI-powered recommendations to help you make the best decisions for your day. Whether you're planning outdoor activities, choosing what to wear, or deciding on travel plans, ATF provides personalized suggestions based on current and forecasted weather conditions.

## ✨ Key Features

### 🎯 Core Functionality
- 🎤 **Voice Input Support** - Speak naturally in Japanese or English
- 🌤️ **Real-time Weather Data** - Accurate, up-to-date weather information
- 🤖 **AI-Powered Suggestions** - Intelligent recommendations for activities, clothing, and travel

### 🚀 Advanced Features
- 🌐 **Bilingual Interface** - Seamlessly switch between Japanese and English
- 🎨 **Beautiful Design** - Modern, responsive interface with smooth animations
- 🌙 **Theme Options** - Choose between light and dark modes
- 📱 **Mobile Optimized** - Perfect experience on any device
- � ***Smart Categories** - Personalized suggestions for travel, fashion, and outdoor activities
- ⚡ **Reliable Performance** - Robust error handling and fallback systems

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Web Speech API** for voice recognition
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **Google Gemini API** for AI responses
- **OpenWeatherMap API** for weather data
- **CORS** enabled for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- API keys (see Environment Setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/atf-weather-assistant.git
   cd atf-weather-assistant
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   ```

3. **Environment Setup**
   
   Create `backend/.env` file:
   ```env
   # Weather API
   OPENWEATHER_API_KEY=your_openweather_api_key
   
   # AI Service  
   GEMINI_API_KEY=your_gemini_api_key
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Terminal 1: Start backend
   cd backend && npm run dev
   
   # Terminal 2: Start frontend
   cd frontend && npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🔑 API Keys Setup

### OpenWeatherMap API
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add to `backend/.env` as `OPENWEATHER_API_KEY`

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `backend/.env` as `GEMINI_API_KEY`

## 🎮 Usage

### Voice Input (Japanese)
1. Click the microphone button 🎤
2. Speak in Japanese: "東京の天気はどうですか？"
3. Get weather data and AI-powered suggestions

### Text Input (Bilingual)
1. Type weather queries in Japanese or English
2. Example: "What's the weather in Tokyo?"
3. Receive contextual activity recommendations

### Language Switching
- Toggle between Japanese (日本語) and English
- All UI elements and responses adapt automatically

## 🏗️ Project Structure

```
atf-weather-assistant/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # Theme & Translation contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── translations/    # i18n translations
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── package.json
├── backend/                  # Node.js Express backend
│   ├── src/
│   │   ├── services/        # Weather & AI services
│   │   ├── types/           # TypeScript interfaces
│   │   └── server.ts        # Express server
│   └── package.json
└── README.md
```

## 🎯 Why Choose ATF Weather Assistant?

### 🌟 Intelligent & Personalized
- **Context-Aware Suggestions**: Get recommendations tailored to your location and weather conditions
- **Multi-Category Advice**: From what to wear to where to go, we've got you covered
- **Natural Interaction**: Speak or type in your preferred language

### 💡 Smart & Reliable
- **Real-Time Data**: Always up-to-date weather information
- **AI-Powered Insights**: Advanced algorithms provide meaningful suggestions
- **Seamless Experience**: Fast, responsive, and always available

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy with environment variables
```

## 🤝 Contributing

We welcome contributions to make ATF Weather Assistant even better!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data API
- **Google Gemini** for AI capabilities
- **Web Speech API** for voice recognition
- **React & TypeScript** community for excellent tooling

---

**Built with ❤️ to help you make the most of every day, whatever the weather brings**