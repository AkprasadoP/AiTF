/**
 * Speech processing utilities for Japanese text
 */
class SpeechService {
  
  /**
   * Common Japanese weather-related vocabulary
   */
  private weatherVocabulary = {
    // Weather conditions
    '晴れ': 'sunny',
    '曇り': 'cloudy', 
    '雨': 'rain',
    '雪': 'snow',
    '風': 'wind',
    '嵐': 'storm',
    '霧': 'fog',
    
    // Temperature
    '暑い': 'hot',
    '寒い': 'cold',
    '涼しい': 'cool',
    '暖かい': 'warm',
    '気温': 'temperature',
    
    // Questions/Requests
    '天気': 'weather',
    '予報': 'forecast',
    'どう': 'how',
    '今日': 'today',
    '明日': 'tomorrow',
    '週末': 'weekend',
    
    // Activities
    '散歩': 'walk',
    '旅行': 'travel',
    '外出': 'go out',
    '運動': 'exercise',
    '買い物': 'shopping',
    
    // Locations
    '東京': 'Tokyo',
    '大阪': 'Osaka',
    '京都': 'Kyoto',
    '横浜': 'Yokohama',
    '名古屋': 'Nagoya',
    '福岡': 'Fukuoka',
    '札幌': 'Sapporo'
  };

  /**
   * Process Japanese text input and extract weather-related information
   */
  processJapaneseInput(text: string): {
    originalText: string;
    translatedTerms: string[];
    detectedLocation?: string;
    intent: 'weather_query' | 'activity_request' | 'general_chat';
    confidence: number;
  } {
    const normalizedText = text.toLowerCase().trim();
    const translatedTerms: string[] = [];
    let detectedLocation: string | undefined;
    let intent: 'weather_query' | 'activity_request' | 'general_chat' = 'general_chat';
    let confidence = 0.5;

    // Translate known vocabulary
    Object.entries(this.weatherVocabulary).forEach(([japanese, english]) => {
      if (normalizedText.includes(japanese)) {
        translatedTerms.push(english);
        
        // Detect location
        if (['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Fukuoka', 'Sapporo'].includes(english)) {
          detectedLocation = english;
        }
      }
    });

    // Determine intent based on keywords
    if (translatedTerms.includes('weather') || translatedTerms.includes('forecast') || 
        translatedTerms.some(term => ['sunny', 'cloudy', 'rain', 'snow', 'hot', 'cold'].includes(term))) {
      intent = 'weather_query';
      confidence = 0.8;
    } else if (translatedTerms.some(term => ['walk', 'travel', 'go out', 'exercise', 'shopping'].includes(term))) {
      intent = 'activity_request';
      confidence = 0.7;
    }

    return {
      originalText: text,
      translatedTerms,
      detectedLocation,
      intent,
      confidence
    };
  }

  /**
   * Extract location from Japanese text
   */
  extractLocation(text: string): string | null {
    const normalizedText = text.toLowerCase();
    
    // Check for Japanese city names
    for (const [japanese, english] of Object.entries(this.weatherVocabulary)) {
      if (normalizedText.includes(japanese) && 
          ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Fukuoka', 'Sapporo'].includes(english)) {
        return english;
      }
    }

    // Check for English city names in the text
    const cities = ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Fukuoka', 'Sapporo'];
    for (const city of cities) {
      if (normalizedText.includes(city.toLowerCase())) {
        return city;
      }
    }

    return null;
  }

  /**
   * Clean and format text for better processing
   */
  cleanText(text: string): string {
    return text
      .trim()
      .replace(/[。、！？]/g, '') // Remove Japanese punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .toLowerCase();
  }

  /**
   * Generate context for AI based on processed speech
   */
  generateContext(processedInput: ReturnType<typeof this.processJapaneseInput>): string {
    const { translatedTerms, detectedLocation, intent, confidence } = processedInput;
    
    let context = `User spoke in Japanese. `;
    
    if (detectedLocation) {
      context += `Location mentioned: ${detectedLocation}. `;
    }
    
    if (translatedTerms.length > 0) {
      context += `Key terms: ${translatedTerms.join(', ')}. `;
    }
    
    context += `Intent: ${intent} (confidence: ${Math.round(confidence * 100)}%). `;
    
    return context;
  }

  /**
   * Check if text contains weather-related content
   */
  isWeatherRelated(text: string): boolean {
    const processed = this.processJapaneseInput(text);
    return processed.intent === 'weather_query' || processed.confidence > 0.6;
  }
}

export default new SpeechService();