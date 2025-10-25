# 🚀 Deployment Guide - ATF Weather Assistant

## Quick Deploy Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend (Vercel)
1. **Connect GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project" → Import from GitHub
   - Select your `atf-weather-assistant` repository

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Deploy**
   - Click "Deploy"
   - Your frontend will be live at: `https://your-app.vercel.app`

#### Backend (Railway)
1. **Connect Repository**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project" → Deploy from GitHub
   - Select your repository

2. **Configure Service**
   ```
   Root Directory: backend
   Build Command: npm run build
   Start Command: npm start
   ```

3. **Add Environment Variables**
   ```
   OPENWEATHER_API_KEY=your_key_here
   GEMINI_API_KEY=your_key_here
   PORT=3001
   NODE_ENV=production
   ```

4. **Update Frontend API URL**
   - Update `frontend/src/services/api.ts`
   - Change API_BASE_URL to your Railway backend URL

### Option 2: Netlify + Render

#### Frontend (Netlify)
1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"

2. **Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

#### Backend (Render)
1. **Create Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"

2. **Configure**
   ```
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

## Environment Variables

### Required for Backend
```env
OPENWEATHER_API_KEY=your_openweather_key
GEMINI_API_KEY=your_gemini_key
PORT=3001
NODE_ENV=production
```

### API Keys Setup
1. **OpenWeatherMap**: https://openweathermap.org/api
2. **Google Gemini**: https://makersuite.google.com/app/apikey

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone repository
git clone https://github.com/yourusername/atf-weather-assistant.git
cd atf-weather-assistant

# Install all dependencies
npm run install:all

# Set up environment variables
cp .env.example backend/.env
# Edit backend/.env with your API keys

# Start development servers
npm run dev
```

### Access Points
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Health: http://localhost:3001/api/health

## Production Checklist

### Before Deployment
- [ ] API keys configured
- [ ] Environment variables set
- [ ] Frontend API URL updated for production
- [ ] Build process tested locally
- [ ] All features tested

### After Deployment
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Weather data retrieval works
- [ ] AI suggestions generate
- [ ] Voice input functions (HTTPS required)
- [ ] Language switching works
- [ ] Mobile responsiveness verified

## Troubleshooting

### Common Issues

#### Voice Input Not Working
- **Cause**: HTTP instead of HTTPS
- **Solution**: Deploy to HTTPS-enabled platform (Vercel/Netlify)

#### API Errors
- **Cause**: Missing or invalid API keys
- **Solution**: Verify environment variables in deployment platform

#### CORS Issues
- **Cause**: Frontend/backend on different domains
- **Solution**: Update CORS configuration in backend

#### Build Failures
- **Cause**: Missing dependencies or environment variables
- **Solution**: Check build logs and ensure all dependencies installed

## Performance Optimization

### Frontend
- Static asset optimization (already configured with Vite)
- Code splitting (React.lazy for large components)
- Image optimization

### Backend
- API response caching
- Rate limiting implementation
- Error logging and monitoring

## Monitoring

### Recommended Tools
- **Frontend**: Vercel Analytics
- **Backend**: Railway Metrics or Render Monitoring
- **Errors**: Sentry (optional)
- **Performance**: Web Vitals

---

**Need help?** Check the main README.md for detailed setup instructions.