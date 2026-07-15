/**
 * API Configuration
 * Automatically detects development vs production environment
 */

// Check if running locally (development mode)
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';

// API Base URL based on environment
export const API_URL = isDevelopment 
  ? 'http://localhost:5000'
  : 'https://ayodhya-estates-web.onrender.com';

export default API_URL;
