import Screen from "@/src/components/Screen/Screen";
import { Text, View } from "react-native";

export default function SimulatorScreen() {
  return (
    <Screen>
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-4xl  color-text-primary font-playfair-bold">
          Salário Curto
        </Text>

        <View className="h-12 w-12 bg-green-900 rounded-full" />
      </View>
    </Screen>
  );
}
