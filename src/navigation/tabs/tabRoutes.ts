import { TabIconConfig } from "./TabBarIcon";

export type TabRouteName = "index" | "compare" | "history";

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
    name: "compare",
    icon: {
      default: "arrow-switch",
    },
    label: "Comparação",
  },
  {
    name: "history",
    icon: {
      default: "history",
    },
    label: "Histórico",
  },
];
