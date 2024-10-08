import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.relevamientoVisual',
  appName: 'relevamientoVisual',
  webDir: 'www',
  plugins:{
    SplashScreen:{
      launchAutoHide: false,
    }
  }
};

export default config;
