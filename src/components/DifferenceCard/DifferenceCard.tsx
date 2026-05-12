import { formatCurrency } from "@/src/utils/currency";
import React from "react";
import { Text, View } from "react-native";
import { getNetSalaryWinnerMessage } from "./proposalComparison";

type Props = {
  firstNetSalary: number;
  secondNetSalary: number;
  netSalaryDifference: number;
  grossSalaryDifference: number;
  deductionDifference: number;
};

export function DifferenceCard({
  firstNetSalary,
  secondNetSalary,
  netSalaryDifference,
  grossSalaryDifference,
  deductionDifference,
}: Props) {
  const netSalaryWinnerMessage = getNetSalaryWinnerMessage(
    firstNetSalary,
    secondNetSalary,
  );

  return (
    <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <Text className="text-2xl font-roboto-bold mb-12">Diferença líquida</Text>

      <Text className="text-4xl font-roboto-bold color-primary mb-2 self-center">
        {formatCurrency(netSalaryDifference)}
      </Text>
      <Text className="font-roboto color-primary bg-primary/10 rounded-2xl p-2 self-center mb-8">
        {netSalaryWinnerMessage}
      </Text>

      <Divider />

      <View className="flex-row items-center justify-between">
        <Text className="font-roboto text-lg">Diferença Bruta</Text>
        <Text className="font-roboto-medium color-black text-lg">
          {formatCurrency(grossSalaryDifference)}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="font-roboto text-lg">Diferença Descontos</Text>
        <Text className="font-roboto-medium color-deduction text-lg">
          {formatCurrency(deductionDifference)}
        </Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View className="h-0.5 bg-gray-200 mb-4" />;
}
