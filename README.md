# ATF Weather Assistant 🌤️
# ATF 天気アシスタント 🌤️

> Your personal AI weather companion — blending forecasts, fashion, and travel advice seamlessly.
> あなた専用のAI天気コンパニオン — 天気予報、ファッション、旅行アドバイスをシームレスに融合

## 🚀 **LIVE DEPLOYMENT**

**🌐 Frontend**: https://my-aitf.vercel.app  
**⚡ Backend API**: https://aitf.onrender.com  
**📊 Health Check**: https://aitf.onrender.com/api/health

✅ **Status**: Fully deployed and operational  
✅ **Features**: All features working including voice recognition, AI suggestions, and bilingual support  
✅ **Resilience**: Comprehensive rate limiting and quota management with graceful fallback systems

## 🌟 Overview | 概要

ATF Weather Assistant is an intelligent weather chatbot that combines real-time weather data with AI-powered recommendations to help you make the best decisions for your day. Whether you're planning outdoor activities, choosing what to wear, or deciding on travel plans, ATF provides personalized suggestions based on current and forecasted weather conditions.

ATF天気アシスタントは、リアルタイムの天気データとAIによる推奨機能を組み合わせた、あなたの一日の最適な判断をサポートするインテリジェントな天気チャットボットです。屋外活動の計画、服装の選択、旅行計画の決定など、ATFは現在および予測される天気条件に基づいてパーソナライズされた提案を提供します。

## 🛠️ Tech Stack

### Frontend (Deployed on Vercel)
- **React 18** with TypeScript for robust component development
- **Tailwind CSS** for modern, responsive styling
- **Framer Motion** for smooth animations and transitions
- **Web Speech API** for Japanese and English voice recognition
- **Vite** for fast development and optimized builds

### Backend (Deployed on Render)
- **Node.js** with Express.js for RESTful API
- **Google Gemini API** for AI-powered suggestions
- **OpenWeatherMap API** for real-time weather data
- **TypeScript** for type-safe server development
- **CORS** enabled for secure cross-origin requests
- **Helmet** for security middleware
- **Compression** for response optimization

### Development & Deployment
- **TypeScript** throughout for type safety
- **ESLint** for code quality
- **Git** for version control with GitHub
- **Environment variables** for secure API key management
- **Vercel** for frontend hosting and CI/CD
- **Render** for backend hosting with auto-deploy

## ✨ Key Features | 主な機能

### 🎯 Core Functionality | コア機能
- 🎤 **Voice Input Support | 音声入力サポート** - Speak naturally in Japanese or English | 日本語または英語で自然に話せます
- 🌤️ **Real-time Weather Data | リアルタイム天気データ** - Accurate, up-to-date weather information | 正確で最新の天気情報
- 🤖 **AI-Powered Suggestions | AI駆動の提案** - Intelligent recommendations for activities, clothing, and travel | アクティビティ、服装、旅行に関するインテリジェントな推奨

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
   - **Live Production**: https://my-aitf.vercel.app

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

## 🎮 Usage | 使用方法

### Voice Input (Japanese) | 音声入力（日本語）
1. Click the microphone button 🎤 | マイクボタンをクリック 🎤
2. Speak in Japanese: "東京の天気はどうですか？" | 日本語で話す：「東京の天気はどうですか？」
3. Get weather data and AI-powered suggestions | 天気データとAI駆動の提案を取得

### Text Input (Bilingual) | テキスト入力（バイリンガル）
1. Type weather queries in Japanese or English | 日本語または英語で天気クエリを入力
2. Example: "What's the weather in Tokyo?" | 例：「東京の天気はどう？」
3. Receive contextual activity recommendations | 文脈に応じたアクティビティの推奨を受け取る

### Language Switching | 言語切り替え
- Toggle between Japanese (日本語) and English | 日本語と英語を切り替え
- All UI elements and responses adapt automatically | すべてのUI要素と応答が自動的に適応

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

## 🎯 Why Choose ATF Weather Assistant? | なぜATF天気アシスタントを選ぶのか？

### 🌟 Intelligent & Personalized | インテリジェント＆パーソナライズ
- **Context-Aware Suggestions | 文脈認識提案**: Get recommendations tailored to your location and weather conditions | あなたの場所と天気条件に合わせた推奨を取得
- **Multi-Category Advice | マルチカテゴリアドバイス**: From what to wear to where to go, we've got you covered | 何を着るかからどこに行くかまで、すべてをカバー
- **Natural Interaction | 自然な対話**: Speak or type in your preferred language | 好みの言語で話したり入力したり
- **Live & Ready | ライブ＆準備完了**: Fully deployed and accessible at https://my-aitf.vercel.app | 完全にデプロイされ、アクセス可能

### 💡 Smart & Reliable
- **Real-Time Data**: Always up-to-date weather information from OpenWeatherMap
- **AI-Powered Insights**: Google Gemini AI provides meaningful suggestions
- **Production Ready**: Deployed on Vercel (frontend) and Render (backend)
- **Rate Limiting & Quota Management**: Comprehensive handling of API free tier limits with graceful fallback suggestions
- **Seamless Experience**: Fast, responsive, and always available

### 🛡️ Production-Grade Resilience
- **Graceful Degradation**: When external APIs reach their free tier limits, the system gracefully provides fallback suggestions while maintaining full weather functionality
- **Error Handling**: Comprehensive error boundaries and user-friendly messaging
- **Fallback Systems**: Multiple model fallbacks for AI services and intelligent location detection
- **Rate Limit Management**: Automatic handling of API quotas with seamless user experience

## 🚀 Deployment

### ✅ Production Deployment (LIVE)

**Frontend - Vercel**
- **URL**: https://my-aitf.vercel.app
- **Status**: ✅ Live and operational
- **Build**: Vite optimized production build
- **Features**: All features working including voice recognition

**Backend - Render**
- **URL**: https://aitf.onrender.com
- **Status**: ✅ Live and operational  
- **Environment**: Production with security middleware
- **APIs**: OpenWeather + Gemini AI integrated
- **CORS**: Configured for frontend communication

### 🔧 Environment Variables (Production)

**Backend (Render)**
```env
NODE_ENV=production
OPENWEATHER_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
FRONTEND_URL=https://my-aitf.vercel.app
```

**Frontend (Vercel)**
```env
VITE_APP_API_URL=https://aitf.onrender.com
VITE_APP_ENVIRONMENT=production
```

### 🧪 Testing the Live App

1. **Visit**: https://my-aitf.vercel.app
2. **Try voice input**: Click 🎤 and say "What's the weather in Tokyo?"
3. **Test Japanese**: Say "東京の天気はどうですか？"
4. **Check AI suggestions**: Get personalized activity recommendations

### 📊 Monitoring

- **Backend Health**: https://aitf.onrender.com/api/health
- **Weather API**: https://aitf.onrender.com/api/weather?location=Tokyo
- **Frontend Status**: Vercel dashboard
- **Backend Logs**: Render dashboard

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

## 🇯🇵 日本語サポート | Japanese Support

ATF天気アシスタントは日本のユーザーのために特別に設計されています：

- **完全な日本語サポート** - インターフェース、音声認識、AI応答すべてが日本語対応
- **日本の文化に配慮** - 日本の気候や文化的背景を考慮したAI提案
- **日本の都市対応** - 東京、大阪、京都など主要都市の正確な天気データ
- **自然な日本語対話** - 「今日の天気はどう？」「傘は必要？」など自然な会話

### 日本語での使用例：
- 「東京の天気を教えて」
- 「今日は外出すべき？」
- 「何を着ればいい？」
- 「5日間の天気予報を見せて」

---

**Built with ❤️ to help you make the most of every day, whatever the weather brings**
**どんな天気でも、あなたの一日を最高にするために❤️を込めて作られました**