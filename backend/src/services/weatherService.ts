import axios from 'axios';
import { WeatherData, WeatherApiResponse, ForecastApiResponse, ForecastItem } from '../types/weather';

class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️  OpenWeatherMap API key not found. Please set OPENWEATHER_API_KEY in environment variables.');
    }
  }

  /**
   * Get current weather data for a location
   */
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${this.baseUrl}/weather`,
        {
          params: {
            q: location,
            appid: this.apiKey,
            units: 'metric',
            lang: 'en'
          },
          timeout: 10000
        }
      );

      const data = response.data;
      
      // Get forecast data for the same location
      const forecast = await this.getForecast(location);

      return this.formatWeatherData(data, forecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  /**
   * Get weather forecast for a location
   */
  private async getForecast(location: string): Promise<ForecastItem[]> {
    try {
      const response = await axios.get<ForecastApiResponse>(
        `${this.baseUrl}/forecast`,
        {
          params: {
            q: location,
            appid: this.apiKey,
            units: 'metric',
            lang: 'en'
          },
          timeout: 10000
        }
      );

      return this.formatForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      // Return empty array if forecast fails, don't break the main weather request
      return [];
    }
  }

  /**
   * Get weather by coordinates
   */
  async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${this.baseUrl}/weather`,
        {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric',
            lang: 'en'
          },
          timeout: 10000
        }
      );

      const data = response.data;
      
      // Get forecast data for the same coordinates
      const forecast = await this.getForecastByCoordinates(lat, lon);

      return this.formatWeatherData(data, forecast);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  /**
   * Get forecast by coordinates
   */
  private async getForecastByCoordinates(lat: number, lon: number): Promise<ForecastItem[]> {
    try {
      const response = await axios.get<ForecastApiResponse>(
        `${this.baseUrl}/forecast`,
        {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric',
            lang: 'en'
          },
          timeout: 10000
        }
      );

      return this.formatForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data by coordinates:', error);
      return [];
    }
  }

  /**
   * Format raw weather API response to our WeatherData interface
   */
  private formatWeatherData(data: WeatherApiResponse, forecast: ForecastItem[]): WeatherData {
    return {
      location: {
        name: data.name,
        country: data.sys.country,
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon
        }
      },
      current: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility / 1000, // Convert to km
        uvIndex: 0, // OpenWeatherMap free tier doesn't include UV index
        icon: data.weather[0].icon
      },
      forecast,
      timestamp: new Date()
    };
  }

  /**
   * Format forecast API response to ForecastItem array
   */
  private formatForecastData(data: ForecastApiResponse): ForecastItem[] {
    // Group forecast data by day and get daily min/max temperatures
    const dailyForecasts = new Map<string, any>();

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyForecasts.has(dateKey)) {
        dailyForecasts.set(dateKey, {
          date,
          temperatures: [item.main.temp],
          condition: item.weather[0].main,
          description: item.weather[0].description,
          precipitationChance: item.pop * 100,
          icon: item.weather[0].icon
        });
      } else {
        const existing = dailyForecasts.get(dateKey);
        existing.temperatures.push(item.main.temp);
      }
    });

    // Convert to ForecastItem array (limit to 5 days)
    return Array.from(dailyForecasts.values())
      .slice(0, 5)
      .map(forecast => ({
        date: forecast.date,
        temperature: {
          min: Math.round(Math.min(...forecast.temperatures)),
          max: Math.round(Math.max(...forecast.temperatures))
        },
        condition: forecast.condition,
        description: forecast.description,
        precipitationChance: Math.round(forecast.precipitationChance),
        icon: forecast.icon
      }));
  }

  /**
   * Get user-friendly error message
   */
  private getErrorMessage(error: any): string {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return 'Invalid API key. Please check your OpenWeatherMap API key.';
      } else if (error.response?.status === 404) {
        return 'Location not found. Please try a different city name.';
      } else if (error.response?.status === 429) {
        return 'API rate limit exceeded. Please try again later.';
      } else if (error.code === 'ECONNABORTED') {
        return 'Request timeout. Please check your internet connection.';
      }
    }
    return 'Unable to fetch weather data. Please try again later.';
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export default WeatherService;