/**
 * Professional Weather Dashboard - Configuration File
 * 
 * HOW TO GET AN OPENWEATHERMAP API KEY:
 * 1. Visit https://openweathermap.org/
 * 2. Click "Sign In" and create a free account.
 * 3. Go to your account profile and navigate to the "API keys" tab.
 * 4. Generate a new API key or copy the default key.
 *    (Note: New OpenWeather keys typically activate within 10 to 60 minutes after generation)
 * 5. Paste your API key into the `API_KEY` property below, or enter it via the Dashboard Settings in the UI.
 */

const CONFIG = {
  // Replace the empty string below with your 32-character OpenWeatherMap API key:
  // e.g., API_KEY: 'abc123def456ghi789jkl012mno345pq'
  API_KEY: '',

  // Base API URLs
  CURRENT_WEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather',
  FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast',

  // Default initial city to load
  DEFAULT_CITY: 'London',

  // Default temperature unit: 'metric' (Celsius) or 'imperial' (Fahrenheit)
  DEFAULT_UNIT: 'metric',

  // Refresh interval in minutes (0 to disable auto-refresh)
  AUTO_REFRESH_MINUTES: 30,

  // Fallback demo cities available when API key is not yet configured or for offline demonstration
  ENABLE_OFFLINE_DEMO_MODE: true
};

// Export to window object for browser access
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
