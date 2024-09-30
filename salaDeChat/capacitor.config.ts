import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.salaDeChat',
  appName: 'salaDeChat',
  webDir: 'www',
  plugins:{
    SplashScreen:{
      launchShowDuration: 1000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
    }
  }
};

export default config;
