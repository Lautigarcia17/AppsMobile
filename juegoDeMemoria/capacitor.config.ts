import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.juegoMemoria',
  appName: 'Juego de memoria',
  webDir: 'www',
  plugins:{
    SplashScreen:{
      launchAutoHide: false,
    }
  }
};

export default config;
