import { PayrollSimulation } from "@/src/domain/Simulation/simulationTypes";
import { formatCurrency } from "@/src/utils/currency";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type HistoryCardProps = {
  simulation: PayrollSimulation;
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
            ULTIMA SIMULAÇÃO
          </Text>
        </View>
        <Text className="text-sm font-roboto color-subtitle ml-auto">
          {formatHistoryDate(simulation.created_at)}
        </Text>
      </View>

      <Text className="text-lg font-roboto color-subtitle mt-4">
        Salário líquido estimado
      </Text>

      <Text className="text-4xl font-roboto-bold mt-1">
        {formatCurrency(parseSimulationNumber(simulation.net_salary))}
      </Text>

      <Divider />

      <Text className="text-lg font-roboto color-subtitle">Salário bruto</Text>
      <Text className="text-2xl font-roboto-bold mt-1 color-secondary">
        {formatCurrency(parseSimulationNumber(simulation.gross_salary))}
      </Text>

      <Link href="/simulation-details" asChild>
        <Pressable
          className="self-end flex-row items-center gap-1"
          hitSlop={10}
        >
          <Text className="text-primary font-roboto-bold ">Ver detalhes</Text>
          <Ionicons name="arrow-forward" size={18} color={"#00685F"} />
        </Pressable>
      </Link>
    </View>
  );
});

function Divider() {
  return <View className="h-0.5 bg-gray-200 my-6" />;
}

function parseSimulationNumber(value: string) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
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
