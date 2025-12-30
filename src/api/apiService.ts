import axios from 'axios';

const resolveBaseUrl = () => {
  const envValue = import.meta.env.VITE_API_BASE_URL?.trim();
  if (envValue) {
    return envValue.endsWith('/') ? envValue.slice(0, -1) : envValue;
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    const scheme = protocol === 'https:' ? 'https' : 'http';
    const host = hostname || 'localhost';
    return `${scheme}://${host}:5276/api`;
  }

  return 'http://localhost:5276/api';
};

const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Her istekte JWT token ekle
apiClient.interceptors.request.use(
  (config) => {
    // Zustand persist storage'dan token'ı al
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error('Token parse error:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
