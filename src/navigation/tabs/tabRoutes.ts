import { TabIconConfig } from "./TabBarIcon";

export type TabRouteName =
  | "SimulatorScreen"
  | "CompareScreen"
  | "HistoryScreen";

export type TabRoute = {
  name: TabRouteName;
  icon: TabIconConfig;
  label: string;
};

export const TAB_ROUTES: TabRoute[] = [
  {
    name: "SimulatorScreen",
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
  {
    name: "HistoryScreen",
    icon: {
      default: "history",
    },
    label: "Histórico",
  },
];
