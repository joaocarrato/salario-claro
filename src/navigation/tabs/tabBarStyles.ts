import { StyleProp, ViewStyle } from "react-native";

const TAB_BAR_CONTENT_HEIGHT = 66;
const TAB_BAR_PADDING_TOP = 10;

export const TAB_BAR_COLORS = {
  active: "#00685F",
  inactive: "#6D7A77",
  background: "#ffffff",
} as const;

export function createTabBarStyle(bottomInset: number): StyleProp<ViewStyle> {
  return {
    paddingTop: TAB_BAR_PADDING_TOP,
    paddingBottom: bottomInset,
    backgroundColor: TAB_BAR_COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    height: TAB_BAR_CONTENT_HEIGHT + bottomInset,
  };
}
