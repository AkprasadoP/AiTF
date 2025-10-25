import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import ChatInterface from './components/ChatInterface'
import LanguageToggle from './components/LanguageToggle'
import ErrorBoundary from './components/ErrorBoundary'
import TroubleshootingGuide from './components/TroubleshootingGuide'
import ThemeToggle from './components/ThemeToggle'
import LandingSection from './components/LandingSection'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { TranslationProvider, useTranslation } from './contexts/TranslationContext'

interface AppSettings {
  language: 'ja' | 'en';
  voiceEnabled: boolean;
  soundEnabled: boolean;
}

function AppContent({ onLanguageChange }: { onLanguageChange: (lang: 'ja' | 'en') => void }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    voiceEnabled: true,
    soundEnabled: true,
  });
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('weatherChatbotSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('weatherChatbotSettings', JSON.stringify(settings));
  }, [settings]);

  // Handle scroll-based transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 = landing page, 1 = chat page)
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to chat section
  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLanguageChange = (language: 'ja' | 'en') => {
    setSettings(prev => ({ ...prev, language }));
    onLanguageChange(language);
  };

  return (
    <ErrorBoundary>
      <div className={`transition-colors duration-300 ${theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>

        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 z-40 h-1">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Fixed Header/Navbar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-sm transition-colors duration-300 ${theme === 'dark'
            ? 'bg-gray-800/80 border-b border-blue-800/50'
            : 'bg-white/80 border-b border-gray-200/50'
            }`}
          style={{ marginTop: '4px' }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🌤️</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                  {t.appTitle}
                </h1>
                <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`}>
                  {t.appSubtitle}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              {/* Developer Name */}
              <div className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                {settings.language === 'ja' ? 'アシシュ・プラサド' : 'Ashish Prasad'}
              </div>

              {/* Language Toggle */}
              <LanguageToggle
                currentLanguage={settings.language}
                onLanguageChange={handleLanguageChange}
              />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Help Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsHelpOpen(true)}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                  ? 'hover:bg-blue-700/30 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-200/50 text-gray-600 hover:text-gray-800'
                  }`}
                title={t.help}
              >
                <HelpCircle size={18} />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Container - Scroll-based Layout */}
        <div className="relative">
          {/* Landing Section - Full Screen */}
          <div
            className="min-h-screen pt-20 relative"
            style={{
              opacity: 1 - scrollProgress,
              transform: `translateY(${scrollProgress * -50}px)`,
              pointerEvents: scrollProgress > 0.8 ? 'none' : 'auto'
            }}
          >
            <LandingSection
              settings={settings}
              onGetStarted={scrollToChat}
            />
          </div>

          {/* Chat Section - Full Screen */}
          <div
            ref={chatSectionRef}
            className="min-h-screen pt-20 relative"
            style={{
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 50}px)`,
              pointerEvents: scrollProgress < 0.2 ? 'none' : 'auto'
            }}
          >
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                className="w-full max-w-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: scrollProgress > 0.3 ? 1 : 0,
                  y: scrollProgress > 0.3 ? 0 : 20
                }}
                transition={{ duration: 0.6 }}
              >
                <ChatInterface settings={settings} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Help Panel */}
        {isHelpOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                ✕
              </button>
              <TroubleshootingGuide />
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}

function App() {
  const [language, setLanguage] = useState<'ja' | 'en'>('en');

  return (
    <ThemeProvider>
      <TranslationProvider language={language}>
        <AppContentWrapper onLanguageChange={setLanguage} />
      </TranslationProvider>
    </ThemeProvider>
  );
}

function AppContentWrapper({ onLanguageChange }: { onLanguageChange: (lang: 'ja' | 'en') => void }) {
  return <AppContent onLanguageChange={onLanguageChange} />;
}

export default App