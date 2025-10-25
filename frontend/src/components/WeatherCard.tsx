import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Eye,
  Droplets,
  MapPin,
  Thermometer
} from 'lucide-react';
import { WeatherData } from '../types';
import { useTranslation } from '../contexts/TranslationContext';

interface WeatherCardProps {
  weatherData: WeatherData;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, className = '' }) => {
  const { t } = useTranslation();

  const getWeatherIcon = (condition: string, _iconCode: string) => {
    const iconProps = { size: 48, className: "text-white drop-shadow-lg" };

    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} />;
      case 'clouds':
        return <Cloud {...iconProps} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} />;
      case 'snow':
        return <CloudSnow {...iconProps} />;
      case 'mist':
      case 'fog':
        return <Cloud {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  const getWeatherGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-yellow-400 via-orange-500 to-red-500';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-blue-400';
      case 'mist':
      case 'fog':
        return 'from-gray-300 via-gray-400 to-gray-500';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`weather-card bg-gradient-to-br ${getWeatherGradient(weatherData.current.condition)} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MapPin size={22} className="text-white/80" />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {weatherData.location.name}
            </h3>
            <p className="text-sm text-white/80">
              {weatherData.location.country}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/80">{t.updated}</p>
          <p className="text-sm text-white/90 font-medium">
            {formatTime(weatherData.timestamp)}
          </p>
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-5">
          {getWeatherIcon(weatherData.current.condition, weatherData.current.icon)}
          <div>
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-white">
                {weatherData.current.temperature}
              </span>
              <span className="text-2xl text-white/80 ml-2">°C</span>
            </div>
            <p className="text-base text-white/90 capitalize mt-1">
              {weatherData.current.description}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2 text-white/80 mb-2">
            <Thermometer size={18} />
            <span className="text-sm">{t.feelsLike}</span>
          </div>
          <span className="text-xl font-semibold text-white">
            {weatherData.current.feelsLike}°C
          </span>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-white/80 mb-2">
            <Droplets size={18} />
            <span className="text-sm">{t.humidity}</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {weatherData.current.humidity}%
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-white/80 mb-2">
            <Wind size={18} />
            <span className="text-sm">{t.wind}</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {weatherData.current.windSpeed} m/s
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-white/80 mb-2">
            <Eye size={18} />
            <span className="text-sm">{t.visibility}</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {weatherData.current.visibility} km
          </p>
        </div>
      </div>

      {/* Forecast */}
      {weatherData.forecast.length > 0 && (
        <div className="border-t border-white/20 pt-6">
          <h4 className="text-base font-medium text-white/90 mb-4">{t.fiveDayForecast}</h4>
          <div className="grid grid-cols-5 gap-3">
            {weatherData.forecast.slice(0, 5).map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-white/80 mb-2 font-medium">
                  {(() => {
                    const dayIndex = new Date(day.date).getDay();
                    const dayNames = [t.days.sun, t.days.mon, t.days.tue, t.days.wed, t.days.thu, t.days.fri, t.days.sat];
                    return dayNames[dayIndex];
                  })()}
                </p>
                <div className="text-sm text-white/90 mb-2">
                  <div className="font-semibold">{day.temperature.max}°</div>
                  <div className="text-white/70">{day.temperature.min}°</div>
                </div>
                <p className="text-sm text-white/80 font-medium">
                  {day.precipitationChance}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeatherCard;