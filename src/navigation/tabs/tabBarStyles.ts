import { StyleProp, ViewStyle } from "react-native";

export const TAB_BAR_COLORS = {
  active: "#00685F",
  inactive: "#6D7A77",
  background: "#ffffff",
} as const;

export function createTabBarStyle(bottomInset: number): StyleProp<ViewStyle> {
  return {
    paddingTop: 10,
    paddingBottom: bottomInset,
    backgroundColor: TAB_BAR_COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  };
}
