// Location extraction utility
export const extractLocationFromText = (text: string): string | null => {
  const normalizedText = text.toLowerCase();
  console.log('🔍 Location extraction input:', text);
  console.log('🔍 Normalized text:', normalizedText);

  // Japanese to English city mapping - CHECK THIS FIRST!
  const japaneseToEnglish: { [key: string]: string } = {
    '東京': 'Tokyo',
    '大阪': 'Osaka',
    '京都': 'Kyoto',
    '横浜': 'Yokohama',
    '名古屋': 'Nagoya',
    '福岡': 'Fukuoka',
    '札幌': 'Sapporo',
    '日本': 'Tokyo', // Default Japan to Tokyo
    'オランガバ': 'Aurangabad', // Japanese pronunciation of Aurangabad
    'オーランガバード': 'Aurangabad'
  };

  // Check for Japanese characters FIRST (use original text, not normalized)
  for (const [japanese, english] of Object.entries(japaneseToEnglish)) {
    if (text.includes(japanese)) {
      console.log('✅ Japanese character match:', japanese, '→', english);
      return english;
    }
  }

  // Common location patterns
  const locationPatterns = [
    // English patterns - basic weather queries
    /weather in ([a-zA-Z\s,]+)/i,
    /weather for ([a-zA-Z\s,]+)/i,
    /weather at ([a-zA-Z\s,]+)/i,
    /how.*weather.*in ([a-zA-Z\s,]+)/i,
    /what.*weather.*in ([a-zA-Z\s,]+)/i,
    /tell me.*weather.*in ([a-zA-Z\s,]+)/i,
    /show.*weather.*in ([a-zA-Z\s,]+)/i,
    /check.*weather.*in ([a-zA-Z\s,]+)/i,

    // Travel and future tense patterns
    /going to ([a-zA-Z\s,]+)/i,
    /plan.*going to ([a-zA-Z\s,]+)/i,
    /planning.*to.*go.*to ([a-zA-Z\s,]+)/i,
    /trip to ([a-zA-Z\s,]+)/i,
    /travel.*to ([a-zA-Z\s,]+)/i,
    /visiting ([a-zA-Z\s,]+)/i,
    /visit ([a-zA-Z\s,]+)/i,
    /plan.*visit.*([a-zA-Z\s,]+)/i,
    /weather.*([a-zA-Z\s,]+).*tomorrow/i,
    /weather.*([a-zA-Z\s,]+).*next week/i,
    /weather.*([a-zA-Z\s,]+).*after.*week/i,

    // More flexible patterns
    /about.*weather.*([a-zA-Z\s,]+)/i,

    // Japanese patterns (both Japanese characters and romanized)
    /([a-zA-Z\s,]+).*no.*tenki/i,
    /([a-zA-Z]+).*weather/i, // Removed \s, to avoid capturing extra words
    // Japanese character patterns
    /(東京|大阪|京都|横浜|名古屋|福岡|札幌|日本|オランガバ|オーランガバード).*の.*天気/i,
    /(東京|大阪|京都|横浜|名古屋|福岡|札幌|日本|オランガバ|オーランガバード).*天気/i,
    // More flexible Japanese patterns
    /([ァ-ヶー]+).*の.*天気/i, // Katakana cities
    /([一-龯]+).*の.*天気/i,  // Kanji cities
  ];

  // Common city names (English, Japanese, and Indian cities)
  const cities = [
    // Japanese cities (English and Japanese)
    'tokyo', 'osaka', 'kyoto', 'yokohama', 'nagoya', 'fukuoka', 'sapporo',
    '東京', '大阪', '京都', '横浜', '名古屋', '福岡', '札幌', '日本',
    // International cities
    'new york', 'london', 'paris', 'berlin', 'rome', 'madrid', 'amsterdam',
    'sydney', 'melbourne', 'toronto', 'vancouver', 'singapore', 'hong kong',
    'seoul', 'beijing', 'shanghai', 'bangkok',
    // Indian cities
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'ahmedabad', 'chennai', 'kolkata',
    'pune', 'jaipur', 'surat', 'lucknow', 'kanpur', 'nagpur', 'indore', 'thane',
    'bhopal', 'visakhapatnam', 'pimpri', 'patna', 'vadodara', 'ghaziabad', 'ludhiana',
    'agra', 'nashik', 'faridabad', 'meerut', 'rajkot', 'kalyan', 'vasai', 'varanasi',
    'srinagar', 'aurangabad', 'dhanbad', 'amritsar', 'navi mumbai', 'allahabad',
    'ranchi', 'howrah', 'coimbatore', 'jabalpur', 'gwalior', 'vijayawada', 'jodhpur',
    'madurai', 'raipur', 'kota', 'guwahati', 'chandigarh', 'solapur', 'hubli',
    'dehradun', 'haridwar', 'rishikesh', 'mussoorie', 'nainital', 'shimla', 'manali',
    'dharamshala', 'mcleodganj', 'kasauli', 'dalhousie', 'kullu', 'spiti', 'leh',
    'ladakh', 'jammu', 'udaipur', 'mount abu', 'jaisalmer', 'bikaner', 'pushkar',
    // US cities
    'los angeles', 'chicago', 'houston', 'phoenix', 'philadelphia', 'san antonio',
    'san diego', 'dallas', 'san jose', 'austin', 'jacksonville', 'san francisco',
    'columbus', 'charlotte', 'fort worth', 'detroit', 'el paso', 'memphis',
    'seattle', 'denver', 'washington', 'boston', 'nashville', 'baltimore',
    'louisville', 'portland', 'oklahoma city', 'milwaukee', 'las vegas'
  ];

  // Try pattern matching first
  for (const pattern of locationPatterns) {
    const match = text.match(pattern); // Use original text, not normalized
    console.log('🔍 Testing pattern:', pattern, 'Match:', match);
    if (match && match[1]) {
      let location = match[1].trim();
      console.log('🔍 Raw location match:', location);

      // Clean up the location by removing common non-location words
      location = location
        .replace(/\b(today|tomorrow|now|currently|right now|this morning|tonight|weather|forecast|after|week|next|plan|planning|trip|travel|visiting|visit|about|the|a|an|and|or|but|so|tell|me|show|check|how|what|is|are|will|be|going|to)\b/gi, '')
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();

      console.log('🔍 Cleaned location:', location);

      // Handle state names (e.g., "Aurangabad Maharashtra" -> "Aurangabad")
      const stateParts = location.split(/\s+/);
      if (stateParts.length > 1) {
        // Try the first part (city name) first
        const cityName = stateParts[0];
        if (cities.includes(cityName.toLowerCase())) {
          location = cityName;
        } else {
          // Use the first word as location
          location = cityName;
        }
      }

      // Validate if it's a reasonable location name
      if (location.length > 2 && location.length < 50) {
        console.log('✅ Pattern match found:', location);
        return capitalizeLocation(location);
      }
    }
  }

  // Try direct city name matching (word boundaries to avoid partial matches)
  for (const city of cities) {
    const cityRegex = new RegExp(`\\b${city}\\b`, 'i');
    if (cityRegex.test(text)) {
      console.log('✅ Direct city match found:', city);
      return capitalizeLocation(city);
    }
  }



  // Special handling for Japan/Japanese cities
  if (normalizedText.includes('japan') && !normalizedText.includes(' in ')) {
    return 'Tokyo'; // Default to Tokyo for general Japan queries
  }

  return null;
};

const capitalizeLocation = (location: string): string => {
  return location
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Test function to validate location extraction
export const testLocationExtraction = () => {
  const testCases = [
    "What's the weather in Tokyo?",
    "How is the weather in New York?",
    "Tell me the weather in London",
    "Weather in Paris today",
    "What's the weather like in Japan?",
    "Tokyo no tenki wa dou desu ka?",
    "I want to know the weather for Sydney",
    "Check weather at Mumbai",
    // Travel-related test cases
    "I am planning to go to Dehradun tomorrow so tell me about the weather",
    "I have a plan of going to Mumbai after a week so tell me about the weather",
    "Going to Delhi next week",
    "Planning a trip to Bangalore",
    "Visiting Chennai tomorrow",
    // Japanese test cases
    "日本の天気はどうですか",
    "東京の天気はどうですか",
    "大阪の天気を教えて",
    "京都の天気はどう",
    "オーストラリアの天気はどうですか"
  ];

  console.log('🧪 Testing location extraction:');
  testCases.forEach(text => {
    const location = extractLocationFromText(text);
    console.log(`"${text}" → ${location || 'No location found'}`);
  });
};