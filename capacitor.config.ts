import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.allstarinfinity.app',
  appName: 'All-Star Infinity',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
