import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Keyboard, Volume2 } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/TranslationContext';

interface ChatInputProps {
    onMessage: (message: string, language: 'ja' | 'en') => void;
    disabled?: boolean;
    placeholder?: string;
    currentLanguage?: 'ja' | 'en';
}

const ChatInput: React.FC<ChatInputProps> = ({
    onMessage,
    disabled = false,
    placeholder = "Type your message or click the mic to speak...",
    currentLanguage = 'en'
}) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [textInput, setTextInput] = useState('');
    const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
    const [detectedLanguage, setDetectedLanguage] = useState<'ja' | 'en'>(currentLanguage);
    const textInputRef = useRef<HTMLInputElement>(null);

    // Speech recognition setup
    const {
        isListening,
        isSupported: speechSupported,
        transcript,
        error: speechError,
        startListening,
        stopListening,
        resetTranscript
    } = useSpeechRecognition({
        language: currentLanguage === 'ja' ? 'ja-JP' : 'en-US',
        continuous: false,
        interimResults: true,
        onResult: (result) => {
            if (result.isFinal && result.transcript.trim()) {
                handleSendMessage(result.transcript.trim());
                resetTranscript();
            }
        },
        onError: (error) => {
            console.error('Speech recognition error:', error);
        }
    });

    // Detect language from text input
    const detectLanguage = (text: string): 'ja' | 'en' => {
        // Simple Japanese detection - check for hiragana, katakana, or kanji
        const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
        return japaneseRegex.test(text) ? 'ja' : 'en';
    };

    const handleSendMessage = (message: string) => {
        if (!message.trim() || disabled) return;

        const language = detectLanguage(message);
        setDetectedLanguage(language);
        onMessage(message.trim(), language);
        setTextInput('');
        resetTranscript();
    };

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(textInput);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(textInput);
        }
    };

    const toggleInputMode = () => {
        if (inputMode === 'text') {
            setInputMode('voice');
            textInputRef.current?.blur();
        } else {
            setInputMode('text');
            textInputRef.current?.focus();
        }
    };

    const handleVoiceToggle = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="p-4">
            {/* Main Input Form */}
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleTextSubmit}
                className="flex items-center space-x-3"
            >
                <div className="flex-1 relative">
                    <input
                        ref={textInputRef}
                        type="text"
                        value={textInput}
                        onChange={(e) => {
                            setTextInput(e.target.value);
                            if (e.target.value) {
                                setDetectedLanguage(detectLanguage(e.target.value));
                            }
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder={t.typeMessage}
                        disabled={disabled}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                </div>

                {/* Voice Button */}
                <button
                    type="button"
                    onClick={handleVoiceToggle}
                    disabled={disabled || !speechSupported}
                    className={`p-3 rounded-2xl transition-all duration-200 ${isListening
                        ? 'bg-red-500 text-white shadow-lg scale-110'
                        : 'bg-gray-600 dark:bg-gray-500 text-white hover:bg-gray-700 dark:hover:bg-gray-400 hover:scale-105'
                        } disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100`}
                    title={isListening ? t.stopListening : t.startVoiceInput}
                >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={disabled || !textInput.trim()}
                    className="p-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                    title={t.sendMessage}
                >
                    <Send size={20} />
                </button>
            </motion.form>

            {/* Voice Status */}
            {isListening && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-center"
                >
                    <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">
                            {t.listening}
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Live Transcript */}
            {transcript && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 rounded-lg p-3"
                >
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <span className="font-medium">{t.transcript}</span>
                        {transcript}
                    </p>
                </motion.div>
            )}

            {/* Speech Error */}
            {speechError && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-lg p-3"
                >
                    <p className="text-sm text-red-800 dark:text-red-200">
                        <span className="font-medium">{t.error}</span>
                        {speechError}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ChatInput;