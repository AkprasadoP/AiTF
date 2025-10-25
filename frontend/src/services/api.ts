import { WeatherData, AIResponse } from '../types';

const API_BASE_URL = '/api';

export class ApiService {
  
  /**
   * Get weather data for a location
   */
  static async getWeather(location: string): Promise<WeatherData> {
    const response = await fetch(`${API_BASE_URL}/weather?location=${encodeURIComponent(location)}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch weather data');
    }
    
    const result = await response.json();
    return result.data;
  }

  /**
   * Get weather data by coordinates
   */
  static async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch weather data');
    }
    
    const result = await response.json();
    return result.data;
  }

  /**
   * Send chat message and get AI response
   */
  static async sendChatMessage(
    message: string, 
    weatherData?: WeatherData, 
    language: 'ja' | 'en' = 'en'
  ): Promise<AIResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        weatherData,
        language
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get AI response');
    }
    
    const result = await response.json();
    return result.data;
  }

  /**
   * Get weather and AI suggestions in one request
   */
  static async getWeatherAndSuggestions(
    location: string,
    message: string = 'What should I do today?',
    language: 'ja' | 'en' = 'en'
  ): Promise<{ weather: WeatherData; ai: AIResponse }> {
    const response = await fetch(`${API_BASE_URL}/weather-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
        message,
        language
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get weather and suggestions');
    }
    
    const result = await response.json();
    return result.data;
  }

  /**
   * Get weather and AI suggestions by coordinates
   */
  static async getWeatherAndSuggestionsByCoordinates(
    lat: number,
    lon: number,
    message: string = 'What should I do today?',
    language: 'ja' | 'en' = 'en'
  ): Promise<{ weather: WeatherData; ai: AIResponse }> {
    const response = await fetch(`${API_BASE_URL}/weather-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat,
        lon,
        message,
        language
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get weather and suggestions');
    }
    
    const result = await response.json();
    return result.data;
  }

  /**
   * Check API health
   */
  static async checkHealth(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    
    return response.json();
  }
}