import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from the correct path FIRST
dotenv.config({ path: path.join(__dirname, '../.env') })

// Import service classes AFTER environment variables are loaded
import WeatherService from './services/weatherService'
import AIService from './services/aiService'

// Create service instances after environment is loaded
const weatherService = new WeatherService()
const aiService = new AIService()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  const weatherConfigured = weatherService.isConfigured()
  const aiConfigured = aiService.isConfigured()

  res.json({
    status: 'OK',
    message: 'ATF Weather Assistant API is running',
    services: {
      weather: weatherConfigured ? 'configured' : 'missing API key',
      ai: aiConfigured ? 'configured' : 'missing API key'
    }
  })
})

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { location, lat, lon } = req.query

    if (!weatherService.isConfigured()) {
      return res.status(500).json({
        error: 'Weather service not configured',
        message: 'Please set OPENWEATHER_API_KEY in environment variables'
      })
    }

    let weatherData

    if (lat && lon) {
      // Get weather by coordinates
      weatherData = await weatherService.getWeatherByCoordinates(
        parseFloat(lat as string),
        parseFloat(lon as string)
      )
    } else if (location) {
      // Get weather by location name
      weatherData = await weatherService.getCurrentWeather(location as string)
    } else {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Please provide either location name or coordinates (lat, lon)'
      })
    }

    res.json({
      success: true,
      data: weatherData
    })
  } catch (error) {
    console.error('Weather API error:', error)
    res.status(500).json({
      error: 'Weather fetch failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
})

// Chat endpoint for AI responses
app.post('/api/chat', async (req, res) => {
  try {
    const { message, weatherData, language = 'en' } = req.body

    if (!message) {
      return res.status(400).json({
        error: 'Missing message',
        message: 'Please provide a message in the request body'
      })
    }

    if (!aiService.isConfigured()) {
      return res.status(500).json({
        error: 'AI service not configured',
        message: 'Please set GEMINI_API_KEY in environment variables'
      })
    }

    let response

    if (weatherData) {
      // Generate activity suggestions based on weather
      response = await aiService.generateSuggestions({
        weatherData,
        userQuery: message,
        language: language as 'ja' | 'en'
      })
    } else {
      // Generate conversational response
      const conversationalResponse = await aiService.generateConversationalResponse(
        message,
        undefined,
        language as 'ja' | 'en'
      )

      response = {
        conversationalResponse,
        suggestions: [],
        explanation: '',
        additionalTips: []
      }
    }

    res.json({
      success: true,
      data: response
    })
  } catch (error) {
    console.error('Chat API error:', error)
    res.status(500).json({
      error: 'AI response failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
})

// Get weather and AI suggestions in one request
app.post('/api/weather-chat', async (req, res) => {
  try {
    const { location, message, language = 'en', lat, lon } = req.body

    if (!weatherService.isConfigured() || !aiService.isConfigured()) {
      return res.status(500).json({
        error: 'Services not configured',
        message: 'Please set both OPENWEATHER_API_KEY and GEMINI_API_KEY in environment variables'
      })
    }

    // Get weather data
    let weatherData
    if (lat && lon) {
      weatherData = await weatherService.getWeatherByCoordinates(
        parseFloat(lat),
        parseFloat(lon)
      )
    } else if (location) {
      weatherData = await weatherService.getCurrentWeather(location)
    } else {
      return res.status(400).json({
        error: 'Missing location',
        message: 'Please provide either location name or coordinates'
      })
    }

    // Generate AI suggestions
    const aiResponse = await aiService.generateSuggestions({
      weatherData,
      userQuery: message || 'What should I do today?',
      language: language as 'ja' | 'en'
    })

    res.json({
      success: true,
      data: {
        weather: weatherData,
        ai: aiResponse
      }
    })
  } catch (error) {
    console.error('Weather-chat API error:', error)
    res.status(500).json({
      error: 'Request failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
  console.log(`🔧 Environment check:`)
  console.log(`   - OPENWEATHER_API_KEY: ${process.env.OPENWEATHER_API_KEY ? '✅ Set' : '❌ Missing'}`)
  console.log(`   - GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing'}`)
  console.log(`🌤️  Weather service: ${weatherService.isConfigured() ? '✅ Ready' : '❌ Missing API key'}`)
  console.log(`🤖 AI service: ${aiService.isConfigured() ? '✅ Ready' : '❌ Missing API key'}`)
})