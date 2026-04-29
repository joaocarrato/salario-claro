import React from "react";
import { Text, View } from "react-native";

type Props = {
  netSalaryDifference: number;
  grossSalaryDifference: number;
  deductionDifference: number;
};

export function DifferenceCard({
  netSalaryDifference,
  grossSalaryDifference,
  deductionDifference,
}: Props) {
  return (
    <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <Text className="text-2xl font-roboto-bold mb-12">Diferença líquida</Text>

      <Text className="text-4xl font-roboto-bold color-primary mb-2 self-center">
        {netSalaryDifference >= 0 ? "+" : ""} R${" "}
        {netSalaryDifference.toFixed(2).replace(".", ",")}
      </Text>
      <Text className="text-md font-roboto-bold color-primary bg-green-200/40 rounded-2xl p-2 self-center mb-8">
        A proposta B paga mais no líquido
      </Text>

      <Divider />

      <View className="flex-row items-center justify-between">
        <Text className="font-roboto text-lg">Diferença Bruta</Text>
        <Text className="font-roboto-medium color-black text-lg">
          {grossSalaryDifference >= 0 ? "+" : ""} R${" "}
          {grossSalaryDifference.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="font-roboto text-lg">Diferença Descontos</Text>
        <Text className="font-roboto-medium color-deduction text-lg">
          {deductionDifference >= 0 ? "+" : ""} R${" "}
          {deductionDifference.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View className="h-0.5 bg-gray-200 mb-4" />;
}
