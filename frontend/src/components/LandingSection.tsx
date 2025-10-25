import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/TranslationContext';

interface LandingSectionProps {
    settings: {
        language: 'ja' | 'en';
        voiceEnabled: boolean;
        soundEnabled: boolean;
    };
    onGetStarted?: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ settings, onGetStarted }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const handleGetStarted = () => {
        if (onGetStarted) {
            onGetStarted();
        } else {
            // Fallback to scroll behavior if no callback provided
            const chatSection = document.getElementById('chat-section');
            chatSection?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto text-center">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 sm:mb-8">
                        <span className="text-3xl sm:text-4xl">🌤️</span>
                    </div>

                    <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                        {t.landingTitle}
                    </h1>

                    <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 px-2 transition-colors duration-300 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                        }`}>
                        {t.landingSubtitle}
                    </p>

                    {/* Beautiful Get Started Button */}
                    <motion.button
                        onClick={handleGetStarted}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 ${theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg hover:shadow-blue-500/25'
                            : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg hover:shadow-blue-600/25'
                            } shadow-2xl hover:shadow-3xl mb-8`}
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>{t.getStarted}</span>
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                🚀
                            </motion.span>
                        </span>

                        {/* Animated background glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                    </motion.button>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12"
                >
                    {[
                        { icon: '🎤', text: t.voiceInputSupport, enabled: settings.voiceEnabled },
                        { icon: '🌤️', text: t.realTimeWeather, enabled: true },
                        { icon: '🧠', text: t.aiRecommendationEngine, enabled: true },
                        { icon: '🌍', text: t.multiLanguageSupport, enabled: true }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className={`p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${theme === 'dark'
                                ? 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60'
                                : 'bg-white/40 border border-gray-200/50 hover:bg-white/60'
                                } ${feature.enabled ? 'opacity-100' : 'opacity-60'}`}
                        >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 mx-auto ${feature.enabled
                                ? theme === 'dark'
                                    ? 'bg-blue-500/20 border border-blue-500/30'
                                    : 'bg-blue-100 border border-blue-300'
                                : theme === 'dark'
                                    ? 'bg-gray-600/20 border border-gray-600/30'
                                    : 'bg-gray-100 border border-gray-300'
                                }`}>
                                <span className="text-lg sm:text-xl lg:text-2xl">{feature.icon}</span>
                            </div>
                            <h3 className={`font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                }`}>
                                {feature.text}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Start Guide */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`max-w-2xl mx-auto p-8 rounded-2xl backdrop-blur-sm mb-12 transition-colors duration-300 ${theme === 'dark'
                        ? 'bg-gray-800/40 border border-gray-700/50'
                        : 'bg-white/40 border border-gray-200/50'
                        }`}
                >
                    <h3 className={`text-2xl font-semibold mb-6 flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                        <span className="mr-3">💡</span>
                        {t.quickStart}
                    </h3>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        <div className="flex items-center space-x-3">
                            <span className="text-blue-500">•</span>
                            <span>{t.quickStartTips.microphone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-blue-500">•</span>
                            <span>{t.quickStartTips.askWeather}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-blue-500">•</span>
                            <span>{t.quickStartTips.aiRecommendations}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-blue-500">•</span>
                            <span>{t.quickStartTips.switchLanguage}</span>
                        </div>
                    </div>
                </motion.div>

                {/* System Status */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-md mx-auto mb-12"
                >
                    <SystemStatus />
                </motion.div> */}

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex flex-col items-center"
                >
                    <p className={`text-sm mb-4 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {t.scrollToChat}
                    </p>
                    <motion.button
                        onClick={handleGetStarted}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`p-3 rounded-full transition-colors duration-300 ${theme === 'dark'
                            ? 'bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 hover:text-white'
                            : 'bg-white/60 hover:bg-white/80 text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        <ChevronDown size={24} />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingSection;