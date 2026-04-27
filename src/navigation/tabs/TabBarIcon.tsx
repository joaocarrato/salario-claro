import Octicons from "@expo/vector-icons/Octicons";
import React, { ComponentProps } from "react";

export type OcticonName = ComponentProps<typeof Octicons>["name"];

export type TabIconConfig = {
  default: OcticonName;
  focused?: OcticonName;
};

type TabBarIconProps = {
  color: string;
  focused: boolean;
  icon: TabIconConfig;
};

export function TabBarIcon({ color, focused, icon }: TabBarIconProps) {
  const name = focused && icon.focused ? icon.focused : icon.default;

  return <Octicons name={name} size={24} color={color} />;
}
