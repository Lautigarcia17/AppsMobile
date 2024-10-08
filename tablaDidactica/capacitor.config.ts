import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.tablaDidactica',
  appName: 'tablaDidactica',
  webDir: 'www',
  plugins:{
    SplashScreen:{
      // launchShowDuration: 1000,
      launchAutoHide: false,
      // launchFadeOutDuration: 1000,
    }
  }
};

export default config;
