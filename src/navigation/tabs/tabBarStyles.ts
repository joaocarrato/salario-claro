import { palette } from "@/src/styles/theme";

export const TAB_BAR_COLORS = {
  active: palette.drySage,
  inactive: "grey",
  background: palette.cream,
} as const;

export function createTabBarStyle(bottomInset: number) {
  return {
    paddingTop: 10,
    paddingBottom: bottomInset,
    backgroundColor: TAB_BAR_COLORS.background,
    borderTopWidth: 0,
    elevation: 0,
  };
}
