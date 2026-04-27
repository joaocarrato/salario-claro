import { useSafeArea } from "@/src/hooks/useSafeArea";

import { createTabBarStyle, TAB_BAR_COLORS } from "./tabBarStyles";

export function useRootTabScreenOptions() {
  const { bottom } = useSafeArea();

  return {
    headerShown: false,
    tabBarActiveTintColor: TAB_BAR_COLORS.active,
    tabBarInactiveTintColor: TAB_BAR_COLORS.inactive,
    tabBarShowLabel: false,
    tabBarStyle: createTabBarStyle(bottom),
    headerShadowVisible: false,
  };
}
