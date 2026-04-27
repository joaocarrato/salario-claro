import "@/global.css";
import { useSafeArea } from "@/src/hooks/useSafeArea";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabLayout from "./(tabs)";

export default function RootLayout() {
  const { bottom } = useSafeArea();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"default"} />
      <TabLayout />
    </SafeAreaProvider>
  );
}
