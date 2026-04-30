import { TabIconConfig } from "./TabBarIcon";

export type TabRouteName = "index" | "CompareScreen" | "HistoryScreen";

export type TabRoute = {
  name: TabRouteName;
  icon: TabIconConfig;
  label: string;
};

export const TAB_ROUTES: TabRoute[] = [
  {
    name: "index",
    icon: {
      default: "graph",
    },
    label: "Simulador",
  },
  {
    name: "CompareScreen",
    icon: {
      default: "arrow-switch",
    },
    label: "Comparação",
  },
];
