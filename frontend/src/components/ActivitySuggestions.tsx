import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Home,
  Shirt,
  UtensilsCrossed,
  TreePine,
  Star,
  Lightbulb
} from 'lucide-react';
import { ActivitySuggestion } from '../types';
import { useTranslation } from '../contexts/TranslationContext';

interface ActivitySuggestionsProps {
  suggestions: ActivitySuggestion[];
  explanation?: string;
  additionalTips?: string[];
  className?: string;
}

const ActivitySuggestions: React.FC<ActivitySuggestionsProps> = ({
  suggestions,
  explanation,
  additionalTips = [],
  className = ''
}) => {
  const { t } = useTranslation();

  const getCategoryIcon = (category: string) => {
    const iconProps = { size: 20, className: "text-blue-600" };

    switch (category) {
      case 'travel':
        return <MapPin {...iconProps} />;
      case 'outdoor':
        return <TreePine {...iconProps} />;
      case 'indoor':
        return <Home {...iconProps} />;
      case 'clothing':
        return <Shirt {...iconProps} />;
      case 'food':
        return <UtensilsCrossed {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'travel':
        return 'bg-purple-50 border-purple-200';
      case 'outdoor':
        return 'bg-green-50 border-green-200';
      case 'indoor':
        return 'bg-blue-50 border-blue-200';
      case 'clothing':
        return 'bg-pink-50 border-pink-200';
      case 'food':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: number) => {
    if (priority >= 4) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {t.priority.high}
        </span>
      );
    } else if (priority >= 3) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {t.priority.medium}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {t.priority.low}
        </span>
      );
    }
  };

  // Sort suggestions by priority (highest first)
  const sortedSuggestions = [...suggestions].sort((a, b) => b.priority - a.priority);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Explanation */}
      {explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <Lightbulb size={24} className="text-blue-600 mt-1 flex-shrink-0" />
            <p className="text-base text-blue-800 dark:text-blue-200 leading-relaxed">{explanation}</p>
          </div>
        </motion.div>
      )}

      {/* Suggestions Grid - 3 top, 2 bottom */}
      <div className="space-y-6">
        {/* First Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedSuggestions.slice(0, 3).map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`suggestion-card ${getCategoryColor(suggestion.category)} p-4 h-full`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="text-2xl flex-shrink-0">
                    {suggestion.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base dark:text-gray-100">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm capitalize dark:text-gray-400">
                      {suggestion.category}
                    </p>
                  </div>
                </div>
                {getPriorityBadge(suggestion.priority)}
              </div>

              {/* Description */}
              <p className="text-sm mb-3 leading-relaxed dark:text-gray-200">
                {suggestion.description}
              </p>

              {/* Reasoning */}
              <div className="bg-white/50 dark:bg-gray-700/50 rounded-md p-3 border border-gray-100 dark:border-gray-600">
                <p className="text-sm dark:text-gray-300">
                  <span className="font-medium">{t.whyThisSuggestion}</span>
                  {suggestion.reasoning}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Row - 2 Cards (if more than 3 suggestions) */}
        {sortedSuggestions.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {sortedSuggestions.slice(3, 5).map((suggestion, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index + 3) * 0.1 }}
                className={`suggestion-card ${getCategoryColor(suggestion.category)} p-4 h-full`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-2xl flex-shrink-0">
                      {suggestion.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base dark:text-gray-100">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm capitalize dark:text-gray-400">
                        {suggestion.category}
                      </p>
                    </div>
                  </div>
                  {getPriorityBadge(suggestion.priority)}
                </div>

                {/* Description */}
                <p className="text-sm mb-3 leading-relaxed dark:text-gray-200">
                  {suggestion.description}
                </p>

                {/* Reasoning */}
                <div className="bg-white/50 dark:bg-gray-700/50 rounded-md p-3 border border-gray-100 dark:border-gray-600">
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium">{t.whyThisSuggestion}</span>
                    {suggestion.reasoning}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional Tips */}
        {additionalTips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-4"
          >
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3 text-base">{t.additionalTips}</h4>
            <ul className="space-y-2">
              {additionalTips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start leading-relaxed">
                  <span className="text-blue-500 mr-3 mt-1 text-lg">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ActivitySuggestions;