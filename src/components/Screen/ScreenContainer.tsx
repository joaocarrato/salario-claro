import React from "react";
import { ScrollViewProps, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type ScreenProps = {
  children: React.ReactNode;
  refreshControl?: ScrollViewProps["refreshControl"];
};

export function ViewContainer({ children }: ScreenProps) {
  return <View className="flex-1 bg-background px-5">{children}</View>;
}

export function ScrollViewContainer({ children, refreshControl }: ScreenProps) {
  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-background px-5"
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bottomOffset={24}
      refreshControl={refreshControl}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
