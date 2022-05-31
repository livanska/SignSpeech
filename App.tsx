import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import app from './app.config.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation/Navigation';
import './config/firebase';
import { AppRegistry, Platform } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RecoilRoot>
          <Navigation />
          <StatusBar style="dark" />
        </RecoilRoot>
      </SafeAreaProvider>
    );
  }
}
if (Platform.OS === 'android') {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent(app.expo.name.toLowerCase(), () => App);
}
