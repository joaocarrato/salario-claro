import Screen from "@/src/components/Screen/Screen";
import { Text, TextInput, View } from "react-native";

export default function SimulatorScreen() {
  return (
    <Screen scrollable>
      <View className="bg-white rounded-lg p-6 shadow-sm">
        <Text className="text-xl font-roboto-bold color-subtitle mb-2">
          Informe seu salário bruto mensal
        </Text>

        <TextInput
          className="p-4 border-2 border-gray-300 rounded-lg"
          placeholder="R$ 1500,00"
        />
      </View>
    </Screen>
  );
}
