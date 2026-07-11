import axios from 'axios';
import { Preferences } from '@capacitor/preferences';

// Public read-only WP/Tribe endpoints (posts, events) — NO Authorization
// header. They return 200 anonymously, so no credential is needed or embedded.
// Never add Basic auth here: Vite inlines env vars into the bundle/APK as
// plaintext, so any secret shipped in the client is trivially extractable.
// The one privileged call (member lookup by email) goes through the Strapi
// backend via `apiClient`, not here.
export const apiWPClient = axios.create({
  baseURL: import.meta.env.VITE_API_WP,
  headers: { 'Content-Type': 'application/json' },
});

export const apiOldClient = axios.create({
  baseURL: import.meta.env.VITE_API_TRIBE_URL,
  headers: { 'Content-Type': 'application/json' },
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