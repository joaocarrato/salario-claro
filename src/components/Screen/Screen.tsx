import { PropsWithChildren } from "react";
import { View } from "react-native";
import ScreenHeader from "./ScreenHeader";

export default function Screen({ children }: PropsWithChildren<{}>) {
  return (
    <View className="flex-1 pt-safe pb-safe bg-background">
      <ScreenHeader />
      <View className="px-5">{children}</View>
    </View>
  );
}
