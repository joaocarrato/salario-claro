import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ComponentProps } from "react";
import { Pressable, PressableProps, Text } from "react-native";

const $buttonStyles = {
  primary: {
    container: "bg-primary rounded-md p-4 flex-row items-center justify-center",
    text: "text-white text-md font-roboto-bold ml-2",
    iconColor: "#FFFFFF",
  },
  outline: {
    container:
      "border border-primary rounded-md p-4 flex-row items-center justify-center",
    text: "text-primary text-md font-roboto-bold ml-2",
    iconColor: "#00685F",
  },
};

type IconName = ComponentProps<typeof Ionicons>["name"];

interface ButtonProps extends PressableProps {
  variant?: "primary" | "outline";
  iconName?: IconName;
}

export function Button({
  variant = "primary",
  iconName,
  ...props
}: ButtonProps) {
  return (
    <Pressable className={$buttonStyles[variant].container} {...props}>
      {iconName && (
        <Ionicons
          name={iconName}
          size={24}
          color={$buttonStyles[variant].iconColor}
        />
      )}
      <Text className={$buttonStyles[variant].text}>Calcular salário</Text>
    </Pressable>
  );
}
