import React from "react";
import { Text, View } from "react-native";

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
  const netSalaryWinnerMessage =
    firstNetSalary > secondNetSalary
      ? "A proposta A paga mais no líquido"
      : secondNetSalary > firstNetSalary
        ? "A proposta B paga mais no líquido"
        : "As duas propostas pagam o mesmo líquido";

  return (
    <View className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <Text className="text-2xl font-roboto-bold mb-12">Diferença líquida</Text>

      <Text className="text-4xl font-roboto-bold color-primary mb-2 self-center">
        {formatCurrency(netSalaryDifference)}
      </Text>
      <Text className="text-md font-roboto-bold color-primary bg-green-200/40 rounded-2xl p-2 self-center mb-8">
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

function formatCurrency(value: number) {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
    .format(Math.abs(value))
    .replace(/\u00a0/g, " ");

  return value < 0 ? `- ${formattedValue}` : formattedValue;
}

function Divider() {
  return <View className="h-0.5 bg-gray-200 mb-4" />;
}
