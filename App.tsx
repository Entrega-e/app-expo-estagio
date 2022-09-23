import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components/native";
import Dashboard from "./src/screens/Dashboard";
import theme from "./src/styles/theme";
import Navbar from "./src/components/Navbar";
import { View, ActivityIndicator } from "react-native";
import OrderContext from "./src/components/Context";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isRefreshing, SetisRefreshing] = useState(false);
  const [update, setUpdate] = useState<boolean | true>(true);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Roboto_400Regular,
          Roboto_500Medium,
          Roboto_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  console.disableYellowBox = true;
  return (
    <ThemeProvider theme={theme}>
      <View onLayout={onLayoutRootView}>
        <Navbar />
        <OrderContext.Provider value={{ update, setUpdate }}>
          <Dashboard isRefreshing={isRefreshing} />
        </OrderContext.Provider>
      </View>
    </ThemeProvider>
  );
}
