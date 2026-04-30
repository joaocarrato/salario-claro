import "@/global.css";
import { RootTabs } from "@/src/navigation/tabs/RootTabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.hideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Playfair Display": require("../src/assets/fonts/PlayfairDisplay-Regular.ttf"),
    "Playfair Display Bold": require("../src/assets/fonts/PlayfairDisplay-Bold.ttf"),
    "Roboto Regular": require("../src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto Medium": require("../src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto Bold": require("../src/assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar barStyle={"dark-content"} />
          <RootTabs />
        </SafeAreaProvider>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}
