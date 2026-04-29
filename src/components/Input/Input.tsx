import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export function Input() {
  const inputRef = React.useRef<TextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }
  return (
    <Pressable onPress={focusInput}>
      <Text className="text-md color-subtitle font-roboto-medium">
        Salário Bruto
      </Text>

      <View className="py-2 px-4 items-center  grow flex-wrap justify-between border border-gray-300 rounded-md mt-2 flex-row ">
        <Text className="text-lg color-black">R$</Text>
        <TextInput ref={inputRef} />
      </View>
    </Pressable>
  );
}
