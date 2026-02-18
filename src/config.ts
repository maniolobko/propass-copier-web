// Configuration API pour PROPASS Copier
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    QUOTA: {
      GET: '/quota',
      UPDATE: '/quota/update',
    },
    READER: {
      STATUS: '/reader/status',
      DETECT: '/reader/detect',
    },
    BADGES: {
      COPY: '/badges/copy',
      VERIFY: '/badges/verify',
    },
    HISTORY: {
      LIST: '/history',
      EXPORT: '/history/export',
    },
  },
}

// Configuration locale
export const APP_CONFIG = {
  APP_NAME: 'PROPASS',
  VERSION: '1.0.0',
  LANGUAGE: 'fr',
  THEME: 'light',
  QUOTE_RELOAD_INTERVAL: 30000, // 30 secondes
  READER_POLL_INTERVAL: 5000,   // 5 secondes
}
