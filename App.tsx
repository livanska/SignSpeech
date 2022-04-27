import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation/Navigation';
import './config/firebase';

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const [fontsLoaded] = useFonts({
  //   Icon: require("./assets/fonts/icons.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
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
