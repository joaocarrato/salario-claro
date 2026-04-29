import { Input } from "@/src/components/Input/Input";
import Screen from "@/src/components/Screen/Screen";
import { Text, View } from "react-native";

export default function CompareScreen() {
  return (
    <Screen scrollable>
      <Text className="text-4xl font-roboto-bold">Comparar propostas</Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8">
        Veja a diferença real entre dois salários
      </Text>

      <View className="p-6 border border-surface rounded-md bg-white">
        <View className="flex-row items-center">
          <View className="bg-gray-300 h-8 w-8 items-center justify-center rounded-2xl">
            <Text className="text-xl color-gray-500 font-roboto">A</Text>
          </View>
          <Text className="text-2xl font-roboto-bold ml-4">Proposta A</Text>
        </View>
        <Divider />

        <Input />

        <View className="p-4 bg-surface rounded-lg my-6">
          <Text className="font-roboto-medium color-secondary mb-2">
            RESUMO DE DESCONTOS
          </Text>

          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-roboto color-secondary">INSS (Teto)</Text>
            <Text className="font-roboto-bold color-deduction">
              - R$ 1.200,00
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="font-roboto color-secondary">IRRF Estimado</Text>
            <Text className="font-roboto-bold color-deduction">
              - R$ 1.200,00
            </Text>
          </View>
        </View>

        <Divider />

        <View className="flex-row items-center justify-between">
          <Text className="font-roboto-bold color-secondary">
            Salário Líquido
          </Text>
          <Text className="text-2xl font-roboto-bold">R$ 5.000,00</Text>
        </View>
      </View>
    </Screen>
  );
}

function Divider() {
  return <View className="h-0.5 bg-gray-200 my-6" />;
}
