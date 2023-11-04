export default {
  expo: {
    jsEngine: 'jsc',
    packagerOpts: {
      config: 'metro.config.js',
      sourceExts: [
        'expo.ts',
        'expo.tsx',
        'expo.js',
        'expo.jsx',
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'wasm',
        'svg',
      ],
    },
    name: 'sign-speech',
    slug: 'sign-speech',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logo-icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-screen.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.app.signSpeech',
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.app.signSpeech',
    },
    extra: {
      eas: {
        projectId: '2f91cc44-5912-462d-9c94-65541d4c028c',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
  },
};
