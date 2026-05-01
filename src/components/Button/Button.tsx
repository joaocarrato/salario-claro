import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ComponentProps, JSX } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

const $buttonStyles = {
  primary: {
    container: "bg-primary rounded-md p-4 flex-row items-center justify-center",
    text: "text-white font-roboto-bold ml-2",
    iconColor: "#FFFFFF",
  },
  outline: {
    container:
      "border border-primary rounded-md p-4 flex-row items-center justify-center",
    text: "text-primary  font-roboto-bold ml-2",
    iconColor: "#00685F",
  },
  disabled: {
    container:
      "bg-gray-300 rounded-md p-4 flex-row items-center justify-center",
    text: "text-gray-500 font-roboto-bold ml-2",
    iconColor: "#A0A0A0",
  },
};

type IconName = ComponentProps<typeof Ionicons>["name"];

interface ButtonProps extends PressableProps {
  variant?: "primary" | "outline" | "disabled";
  iconName?: IconName;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  iconName,
  title,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={$buttonStyles[variant].container}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={$buttonStyles[variant].iconColor} />
      ) : (
        <ButtonContainer variant={variant} iconName={iconName} title={title} />
      )}
    </Pressable>
  );
}

function ButtonContainer({
  variant = "primary",
  iconName,
  title,
}: Pick<ButtonProps, "variant" | "iconName" | "title">): JSX.Element {
  return (
    <>
      {iconName && (
        <Ionicons
          name={iconName}
          size={22}
          color={$buttonStyles[variant].iconColor}
        />
      )}
      <Text className={$buttonStyles[variant].text}>{title}</Text>
    </>
  );
}
