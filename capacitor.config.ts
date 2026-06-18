import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mayorista.virtual',
  appName: 'Mayorista Virtual',
  webDir: 'out',
  server: {
    iosScheme: 'https',
    hostname: 'app.mayorista.virtual',
    // Permite conexiones locales para desarrollo
    allowNavigation: ['*']
  },
  ios: {
    // Configuración específica para iOS
    contentInset: 'automatic',
    scrollEnabled: true,
    // Optimizado para iPhone 13 y superior
    limitsNavigationsToAppBoundDomains: false,
    // Soporte para pantallas modernas
    preferredContentMode: 'mobile'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  }
};

export default config;

// Made with Bob
