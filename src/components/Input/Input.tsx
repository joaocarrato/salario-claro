import React from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
}

export function Input({ label, errorMessage, ...props }: InputProps) {
  const inputRef = React.useRef<TextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }
  return (
    <Pressable onPress={focusInput}>
      <Text className="text-md color-subtitle font-roboto-medium">{label}</Text>

      <View
        className={`py-2 px-4 items-center  grow flex-wrap justify-between border ${errorMessage ? "border-red-500" : "border-gray-300"} rounded-md mt-2 flex-row`}
      >
        <Text className="text-lg color-black">R$</Text>
        <TextInput
          ref={inputRef}
          style={{ fontFamily: "Roboto Regular" }}
          {...props}
        />
      </View>
      {errorMessage && (
        <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text>
      )}
    </Pressable>
  );
}
