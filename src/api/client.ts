import axios from 'axios';

const credentials = btoa(
  `${import.meta.env.VITE_API_USER}:${import.meta.env.VITE_API_USER_PASSW}`
);

export const apiWPClient = axios.create({
  baseURL: import.meta.env.VITE_API_WP,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${credentials}`
  },
});

export const apiOldClient = axios.create({
  baseURL: import.meta.env.VITE_API_TRIBE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${credentials}`
  },
});

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
  },
});

export const apiAuthClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});