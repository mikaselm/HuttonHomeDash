// API Configuration - loads from environment variable or global window object
// Set GOOGLE_CALENDAR_API_KEY as an environment variable when deploying
window.GOOGLE_API_CONFIG = {
  apiKey: window.GOOGLE_CALENDAR_API_KEY || 'PLACEHOLDER_KEY_SET_ON_DEPLOYMENT'
};
