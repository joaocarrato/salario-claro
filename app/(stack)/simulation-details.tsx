import Screen from "@/src/components/Screen/Screen";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SimulationDetailsScreen() {
  return (
    <Screen scrollable>
      <Pressable
        accessibilityRole="button"
        className="flex-row items-center gap-2 mb-6"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" color={"#00685F"} size={22} />
        <Text className="text-primary font-roboto-bold text-base">Voltar</Text>
      </Pressable>

      <Text className="text-4xl font-roboto-bold">
        Detalhes da simulação
      </Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8">
        Confira os descontos e valores calculados.
      </Text>

      <View className="bg-white rounded-lg p-6 shadow-sm">
        <Text className="text-lg font-roboto color-subtitle">
          Tela preparada para receber os dados da simulação selecionada.
        </Text>
      </View>
    </Screen>
  );
}
