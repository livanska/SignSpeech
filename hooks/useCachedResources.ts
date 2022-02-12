import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "ubuntu-light": require("../assets/fonts/ubuntu/Ubuntu-Light.ttf"),
          "ubuntu-medium": require("../assets/fonts/ubuntu/Ubuntu-Medium.ttf"),
          "ubuntu-regular": require("../assets/fonts/ubuntu/Ubuntu-Regular.ttf"),
          "ubuntu-bold": require("../assets/fonts/ubuntu/Ubuntu-Bold.ttf"),
          Icon: require("../assets/fonts/icons/icons.ttf"),
        });
        //
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
