import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, AlertCircle } from 'lucide-react'
import ChatInput from './ChatInput'
import WeatherCard from './WeatherCard'
import ActivitySuggestions from './ActivitySuggestions'

import TypingIndicator from './TypingIndicator'
import { ChatMessage, WeatherData, AIResponse } from '../types'
import { ApiService } from '../services/api'
import { extractLocationFromText, testLocationExtraction } from '../utils/locationExtractor'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from '../contexts/TranslationContext'

interface ChatInterfaceProps {
  settings?: {
    language: 'ja' | 'en';
    voiceEnabled: boolean;
    soundEnabled: boolean;
  };
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ settings }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [currentSuggestions, setCurrentSuggestions] = useState<AIResponse | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Dynamic layout state - starts centered, becomes split after first response
  const hasContent = currentWeather || (currentSuggestions && currentSuggestions.suggestions.length > 0)
  const shouldUseSplitLayout = hasContent
  const showWelcomeScreen = messages.length === 0 && !isLoading

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleMessage = async (message: string, _detectedLanguage: 'ja' | 'en') => {
    // Use the app's current language setting instead of detected language for API calls
    const currentLanguage = settings?.language || 'en';
    if (!message.trim()) return

    setError(null)
    setIsLoading(true)

    // Add user message
    addMessage({
      type: 'user',
      content: message
    })

    try {
      // Extract location from user's message first
      const extractedLocation = extractLocationFromText(message);
      console.log('User message:', message);
      console.log('Extracted location from message:', extractedLocation);

      // Run test for debugging (remove this later)
      if (message.includes('日本') || message.includes('東京')) {
        console.log('🧪 Running Japanese location test:');
        testLocationExtraction();
      }

      let weatherData: WeatherData | null = null

      if (extractedLocation) {
        // Use the location mentioned in speech
        console.log(`Getting weather for: ${extractedLocation}`);
        weatherData = await ApiService.getWeather(extractedLocation);
      } else {
        // Fallback to geolocation if no location mentioned
        console.log('No location mentioned, trying geolocation...');
        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                enableHighAccuracy: true,
                maximumAge: 300000 // 5 minutes cache
              })
            })

            console.log('Geolocation coordinates:', position.coords.latitude, position.coords.longitude);
            weatherData = await ApiService.getWeatherByCoordinates(
              position.coords.latitude,
              position.coords.longitude
            )

            // Log the detected location for debugging
            console.log('Detected location from coordinates:', weatherData.location.name);



          } catch (geoError) {
            console.log('Geolocation failed, using Tokyo as default')
            weatherData = await ApiService.getWeather('Tokyo')
          }
        } else {
          console.log('Geolocation not supported, using Tokyo as default')
          weatherData = await ApiService.getWeather('Tokyo')
        }
      }

      setCurrentWeather(weatherData)

      // Try to get AI suggestions, but don't fail if AI service is down
      try {
        const aiResponse = await ApiService.sendChatMessage(
          message,
          weatherData,
          currentLanguage // Use app's current language setting
        )

        setCurrentSuggestions(aiResponse)

        // Add bot response with AI suggestions
        addMessage({
          type: 'bot',
          content: aiResponse.conversationalResponse || t.botResponses.weatherSuggestions,
          weatherData,
          suggestions: aiResponse.suggestions
        })
      } catch (aiError) {
        console.error('AI service error:', aiError);

        // Show weather data even if AI fails
        const aiErrorMessage = aiError instanceof Error ? aiError.message : 'AI service temporarily unavailable';

        addMessage({
          type: 'bot',
          content: t.botResponses.weatherRetrieved,
          weatherData
        })

        // Set a non-critical error that doesn't hide the weather
        setError(`AI suggestions unavailable: ${aiErrorMessage}`);
      }

    } catch (err) {
      // This catch block is only for weather API errors
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)

      const errorContent = `${t.botResponses.weatherError}: ${errorMessage}`;

      addMessage({
        type: 'bot',
        content: errorContent
      })
    } finally {
      setIsLoading(false)
    }
  }



  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  const handleQuickAction = (action: string) => {
    const currentLanguage = settings?.language || 'en';
    const actionMessages = {
      'current': currentLanguage === 'ja' ? '現在の天気はどうですか？' : 'What\'s the current weather?',
      'forecast': currentLanguage === 'ja' ? '5日間の天気予報を教えて' : 'Show me the 5-day forecast',
      'statistics': currentLanguage === 'ja' ? '過去の天気統計を見せて' : 'Show me past weather statistics'
    }
    handleMessage(actionMessages[action as keyof typeof actionMessages] || action, currentLanguage)
  }

  return (
    <div className={`h-full flex flex-col p-2 sm:p-4 overflow-hidden transition-colors duration-300 ${theme === 'dark'
      ? 'bg-gradient-to-br from-gray-900/50 to-blue-900/50'
      : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>

      {/* Main Chat Card Container */}
      <div className={`flex-1 flex flex-col max-w-4xl mx-auto w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300 ${theme === 'dark'
        ? 'bg-gray-800/90 border border-gray-700/50'
        : 'bg-white border border-gray-200/50'
        } backdrop-blur-sm`}>

        {/* Header */}
        <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b transition-colors duration-300 ${theme === 'dark'
          ? 'border-gray-700/50 bg-gray-800/60'
          : 'border-gray-200/50 bg-gray-50/50'
          }`}>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-base sm:text-lg">🌤️</span>
            </div>
            <h1 className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
              {t.chatTitle}
            </h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Welcome Screen */}
          {showWelcomeScreen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-6 sm:py-8"
            >
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                {/* Waving Hand Icon */}
                <motion.div
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6"
                >
                  👋
                </motion.div>

                <h2 className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                  {t.hello}
                </h2>

                <p className={`text-base sm:text-lg px-2 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {t.letsGetStarted}
                </p>
              </motion.div>

              {/* Quick Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center mb-6 sm:mb-8 px-2"
              >
                {[
                  { id: 'current', label: t.currentWeather, icon: '🌤️' },
                  { id: 'forecast', label: t.fiveDayForecast, icon: '📅' },
                  { id: 'statistics', label: t.pastStatistics, icon: '📊' }
                ].map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAction(action.id)}
                    disabled={isLoading}
                    className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 ${theme === 'dark'
                      ? 'bg-gray-700/60 hover:bg-gray-600/80 text-gray-200 border border-gray-600/50'
                      : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 border border-gray-300/50'
                      } backdrop-blur-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="mr-1 sm:mr-2 text-sm sm:text-base">{action.icon}</span>
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* Chat Input for Welcome Screen */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="w-full max-w-2xl"
              >
                <ChatInput
                  onMessage={handleMessage}
                  disabled={isLoading}
                  currentLanguage={settings?.language || 'en'}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Dynamic Layout Container */}
          <div className={`flex-1 flex flex-col transition-all duration-700 ease-in-out ${shouldUseSplitLayout ? 'gap-4' : showWelcomeScreen ? 'hidden' : 'items-center justify-center'
            }`}>

            {/* Top Row - Chat and Weather (when split) */}
            <div className={`flex gap-4 transition-all duration-700 ease-in-out ${shouldUseSplitLayout
              ? 'flex-1 min-h-0'
              : 'w-full max-w-4xl'
              }`}>

              {/* Main Chat Area */}
              <div className={`flex flex-col transition-all duration-700 ease-in-out ${shouldUseSplitLayout
                ? 'flex-1 min-w-0'
                : 'w-full'
                }`}>
                <div className={`rounded-2xl shadow-xl overflow-hidden flex-1 flex flex-col min-h-0 transition-colors duration-300 ${theme === 'dark'
                  ? 'bg-gray-800/90 border border-gray-700/50'
                  : 'bg-white'
                  }`}>
                  {/* Chat Messages Area */}
                  <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 custom-scrollbar">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.95,
                            x: message.type === 'user' ? 20 : -20
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            x: 0
                          }}
                          exit={{
                            opacity: 0,
                            y: -20,
                            scale: 0.95,
                            transition: { duration: 0.2 }
                          }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                          }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className={`chat-bubble ${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                              } max-w-md relative group`}
                          >
                            {/* Message content with typing animation for bot messages */}
                            <motion.div
                              initial={message.type === 'bot' ? { opacity: 0 } : undefined}
                              animate={message.type === 'bot' ? { opacity: 1 } : undefined}
                              transition={message.type === 'bot' ? { delay: 0.3, duration: 0.5 } : undefined}
                            >
                              <p className="text-sm">
                                {formatMessageContent(message.content)}
                              </p>
                            </motion.div>

                            <span className="text-xs opacity-70 mt-1 block">
                              {message.timestamp.toLocaleTimeString()}
                            </span>

                            {/* Subtle glow effect on hover */}
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${message.type === 'user'
                              ? 'bg-blue-400'
                              : theme === 'dark' ? 'bg-gray-300' : 'bg-gray-600'
                              }`} />
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* AI Typing Indicator */}
                    <AnimatePresence>
                      {isLoading && (
                        <TypingIndicator message={t.botResponses.gettingWeather} />
                      )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>



                  {/* Chat Input Area */}
                  <ChatInput
                    onMessage={handleMessage}
                    disabled={isLoading}
                    currentLanguage={settings?.language || 'en'}
                  />
                </div>
              </div>

              {/* Weather Card - Right Side (Split Layout Only) */}
              {shouldUseSplitLayout && (
                <motion.div
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-80 flex-shrink-0 space-y-4"
                >
                  {currentWeather && (
                    <>
                      <WeatherCard weatherData={currentWeather} />

                      {/* Location Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className={`rounded-lg shadow-sm p-4 transition-colors duration-300 ${theme === 'dark'
                          ? 'bg-gray-800/90 border border-gray-700/50'
                          : 'bg-white'
                          }`}
                      >
                        <div className={`flex items-center space-x-2 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                          <MapPin size={16} />
                          <span className="text-sm">
                            Showing weather for {currentWeather.location.name}, {currentWeather.location.country}
                          </span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              )}
            </div>

            {/* AI Suggestions - Bottom Row (Split Layout Only) */}
            {shouldUseSplitLayout && currentSuggestions && currentSuggestions.suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="w-full"
              >
                <div className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${theme === 'dark'
                  ? 'bg-gray-800/90 border border-gray-700/50'
                  : 'bg-white'
                  }`}>
                  <h3 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                    🤖 AI Suggestions
                  </h3>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    <ActivitySuggestions
                      suggestions={currentSuggestions.suggestions}
                      explanation={currentSuggestions.explanation}
                      additionalTips={currentSuggestions.additionalTips}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-lg p-4"
          >
            <div className="flex items-start space-x-2">
              <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">Error</p>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatInterface