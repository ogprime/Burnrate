import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.burnrate.app',
  appName: 'Burn Rate',
  webDir: 'dist',
  server: {
    androidScheme: 'https', // required for localStorage + fetch to work correctly on Android
  },
};

export default config;
