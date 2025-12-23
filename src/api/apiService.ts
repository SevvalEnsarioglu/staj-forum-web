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
    return `${scheme}://${host}:5236/api`;
  }

  return 'http://localhost:5236/api';
};

const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
