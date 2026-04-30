import { useSafeArea } from "@/src/hooks/useSafeArea";

import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createTabBarStyle, TAB_BAR_COLORS } from "./tabBarStyles";

export function useRootTabScreenOptions(): BottomTabNavigationOptions {
  const { bottom } = useSafeArea();

  return {
    headerShown: false,
    tabBarActiveTintColor: TAB_BAR_COLORS.active,
    tabBarInactiveTintColor: TAB_BAR_COLORS.inactive,
    tabBarShowLabel: true,
    tabBarStyle: createTabBarStyle(bottom),
    headerShadowVisible: false,
  };
}
