import { formatCurrency } from "@/src/utils/currency";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Text, View } from "react-native";

export type HistoryCardData = {
  grossSalary: number;
  netSalary: number;
  createdAt: string | null;
};

type HistoryCardProps = {
  simulation: HistoryCardData;
};

export const HistoryCard = React.memo(function HistoryCard({
  simulation,
}: HistoryCardProps) {
  return (
    <View className="relative overflow-hidden bg-white rounded-lg p-6 shadow-sm">
      <View pointerEvents="none" className="absolute right-0 top-0 opacity-10">
        <Octicons name="history" color={"#555C6A"} size={80} />
      </View>

      <View className="flex-row items-center">
        <View className="flex-row items-center gap-2">
          <Ionicons name="time" color={"#00685F"} size={28} />
          <Text className="text-lg font-roboto-bold text-primary">
            ÚLTIMA SIMULAÇÃO
          </Text>
        </View>
        <Text className="text-sm font-roboto color-subtitle ml-auto">
          {formatHistoryDate(simulation.createdAt)}
        </Text>
      </View>

      <Text className="text-lg font-roboto color-subtitle mt-4">
        Salário líquido estimado
      </Text>

      <Text className="text-4xl font-roboto-bold mt-1">
        {formatCurrency(simulation.netSalary)}
      </Text>

      <Divider />

      <Text className="text-lg font-roboto color-subtitle">Salário bruto</Text>
      <Text className="text-2xl font-roboto-bold mt-1 color-secondary">
        {formatCurrency(simulation.grossSalary)}
      </Text>
    </View>
  );
});

function Divider() {
  return <View className="h-0.5 bg-gray-200 my-6" />;
}

function formatHistoryDate(value: string | null) {
  if (!value) {
    return "Recente";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recente";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
