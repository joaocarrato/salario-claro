import { useSafeArea } from "@/src/hooks/useSafeArea";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { bottom } = useSafeArea();
  return (
    <React.Fragment>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#A2A77F",
          tabBarInactiveTintColor: "grey",
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: 10,
            paddingBottom: bottom,
            backgroundColor: "#EFF1C5",
            borderTopWidth: 0,
          },
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="SimulatorScreen"
          options={{
            tabBarIcon: (props) => (
              <Octicons
                name={props.focused ? "home-fill" : "home"}
                size={24}
                color={props.color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="CompareScreen"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Octicons
                name={focused ? "git-compare" : "git-compare"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="HistoryScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <Octicons name={"history"} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
