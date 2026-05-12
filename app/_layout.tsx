import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

void SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

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
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar barStyle={"dark-content"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(stack)" />
          </Stack>
        </SafeAreaProvider>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}
