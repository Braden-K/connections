import { useCallback, useEffect, useState } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import BaseStackNavigator from "./navigation/BaseStackNavigator";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { setCustomText } from "react-native-global-props";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          poppins: require("./assets/fonts/Poppins-Black.ttf"),
          code: require("./assets/fonts/SourceCodePro-Black.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setFontsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setCustomText({ style: { fontFamily: "code" } });
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <BaseStackNavigator />
      </View>
    </Provider>
  );
}
