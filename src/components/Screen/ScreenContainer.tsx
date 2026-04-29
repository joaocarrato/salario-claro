import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type ScreenProps = {
  children: React.ReactNode;
};

export function ViewContainer({ children }: ScreenProps) {
  return <View className="flex-1 bg-background px-5">{children}</View>;
}

export function ScrollViewContainer({ children }: ScreenProps) {
  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-background px-5"
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bottomOffset={24}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
