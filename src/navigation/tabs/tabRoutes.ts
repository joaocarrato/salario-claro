import { TabIconConfig } from "./TabBarIcon";

export type TabRouteName =
  | "SimulatorScreen"
  | "CompareScreen"
  | "HistoryScreen";

export type TabRoute = {
  name: TabRouteName;
  icon: TabIconConfig;
};

export const TAB_ROUTES: TabRoute[] = [
  {
    name: "SimulatorScreen",
    icon: {
      default: "home",
      focused: "home-fill",
    },
  },
  {
    name: "CompareScreen",
    icon: {
      default: "git-compare",
      focused: "git-compare",
    },
  },
  {
    name: "HistoryScreen",
    icon: {
      default: "history",
    },
  },
];
