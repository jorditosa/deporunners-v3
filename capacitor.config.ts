import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cat.deporunners',
  appName: 'Deporunners',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    App: {  
      appUrlOpen: {
        schemes: ['deporunners']
      }
    },
    CapacitorCookies: {
      enabled: true
    },
    CapacitorHttp: {
      enabled: true,
    },
    StatusBar: {
      backgroundColor: '#03bdff'
    }
  }
};

export default config;
