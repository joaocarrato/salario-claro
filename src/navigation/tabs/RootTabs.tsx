import { Tabs } from "expo-router";
import React from "react";

import { TAB_ROUTES } from "./tabRoutes";
import { createTabScreenOptions } from "./tabScreenOptions";
import { useRootTabScreenOptions } from "./useRootTabScreenOptions";

export function RootTabs() {
  const screenOptions = useRootTabScreenOptions();

  return (
    <Tabs screenOptions={screenOptions}>
      {TAB_ROUTES.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={createTabScreenOptions(route)}
        />
      ))}
    </Tabs>
  );
}
