import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.alarmaRobo',
  appName: 'alarmaRobo',
  webDir: 'www',
  plugins:{
    SplashScreen:{
      launchAutoHide: false
    }
  }
};

export default config;
