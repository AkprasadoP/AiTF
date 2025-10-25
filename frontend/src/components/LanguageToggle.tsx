import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
    currentLanguage: 'ja' | 'en';
    onLanguageChange: (language: 'ja' | 'en') => void;
    disabled?: boolean;
    className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
    currentLanguage,
    onLanguageChange,
    disabled = false,
    className = ''
}) => {
    const languages = [
        { code: 'ja' as const, label: '日本語', flag: '🇯🇵' },
        { code: 'en' as const, label: 'English', flag: '🇺🇸' }
    ];

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <Globe size={16} className="text-gray-400" />

            <div className="flex bg-gray-700/50 rounded-lg p-1">
                {languages.map((lang) => (
                    <motion.button
                        key={lang.code}
                        whileHover={{ scale: disabled ? 1 : 1.05 }}
                        whileTap={{ scale: disabled ? 1 : 0.95 }}
                        onClick={() => !disabled && onLanguageChange(lang.code)}
                        disabled={disabled}
                        className={`
              flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
              ${currentLanguage === lang.code
                                ? 'bg-blue-500 text-white shadow-sm'
                                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                            }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
                    >
                        <span className="text-xs">{lang.flag}</span>
                        <span className="hidden sm:inline">{lang.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default LanguageToggle;