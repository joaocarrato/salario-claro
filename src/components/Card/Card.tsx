import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ComponentProps, useRef } from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from "react-native";

const cardStyles = {
  mainCard: {
    container: "bg-white rounded-lg p-6 shadow-sm",
    text: "text-xl font-roboto-bold color-subtitle mb-2",
  },
  smallCard: {
    container: "bg-white rounded-lg p-4 shadow-sm",
    text: "text-md font-roboto color-black mb-2",
  },
};

type IconName = ComponentProps<typeof Ionicons>["name"];

export interface CardProps extends Pick<ViewProps, "style"> {
  title: string;
  iconName?: IconName;
  cardStyle?: "mainCard" | "smallCard";
  textInputProps?: Pick<
    TextInputProps,
    "placeholder" | "value" | "onChangeText" | "keyboardType" | "onBlur"
  >;
}

export default function Card({
  title,
  iconName,
  cardStyle = "mainCard",
  textInputProps,
  ...props
}: CardProps) {
  const inputRef = useRef<TextInput>(null);

  function handleInputPress() {
    inputRef.current?.focus();
  }

  return (
    <Pressable
      className={cardStyles[cardStyle].container}
      {...props}
      onPress={handleInputPress}
    >
      <Text className={cardStyles[cardStyle].text}>{title}</Text>

      <View className="flex-row p-1 px-4 border-2 border-gray-300 rounded-lg flex-wrap grow items-center">
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={"#6D7A77"}
            style={{ marginLeft: -4, marginRight: 8 }}
          />
        )}
        <TextInput
          ref={inputRef}
          placeholderTextColor={"#6E7583"}
          style={$inputStyle}
          {...textInputProps}
        />
      </View>
    </Pressable>
  );
}

const $inputStyle: StyleProp<TextStyle> = {
  fontFamily: "Roboto Regular",
  fontSize: 16,
  color: "#000",
  height: 40,
};
