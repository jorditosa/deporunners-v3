import axios from 'axios';
import { Preferences } from '@capacitor/preferences';

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
  },
});

// Attach the logged-in user's own token instead of a shared static key, so
// writes (add/delete list entries, delete account) are authorized as that
// user rather than under one credential shared by every app install.
apiClient.interceptors.request.use(async (config) => {
  const { value } = await Preferences.get({ key: 'depotoken' });
  if (value) {
    config.headers.Authorization = `Bearer ${value}`;
  }
  return config;
});

export const apiAuthClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});