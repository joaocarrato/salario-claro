import React from "react";

import { TabBarIcon } from "./TabBarIcon";
import { TabRoute } from "./tabRoutes";

export function createTabScreenOptions(route: TabRoute) {
  return {
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <TabBarIcon color={color} focused={focused} icon={route.icon} />
    ),
  };
}
