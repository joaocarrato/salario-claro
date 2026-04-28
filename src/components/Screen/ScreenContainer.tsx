import React from "react";
import { ScrollView, View } from "react-native";

type ScreenProps = {
  children: React.ReactNode;
};

export function ViewContainer({ children }: ScreenProps) {
  return <View className="flex-1 bg-background px-5">{children}</View>;
}

export function ScrollViewContainer({ children }: ScreenProps) {
  return (
    <ScrollView
      className="flex-1 bg-background px-5"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}
