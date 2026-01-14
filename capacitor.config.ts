import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.burnrate.app',
  appName: 'Burn Rate',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
