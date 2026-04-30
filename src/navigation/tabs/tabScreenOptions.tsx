import React from "react";
import { StyleSheet, Text } from "react-native";

import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "./TabBarIcon";
import { TabRoute } from "./tabRoutes";

export function createTabScreenOptions(
  route: TabRoute,
): BottomTabNavigationOptions {
  return {
    tabBarLabel: ({ color }) => (
      <Text style={[styles.label, { color }]}>{route.label}</Text>
    ),
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <TabBarIcon color={color} focused={focused} icon={route.icon} />
    ),
  };
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: "Roboto Bold",
  },
});
