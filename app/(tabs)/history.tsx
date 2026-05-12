import { HistoryCard } from "@/src/components/HistoryCard/HistoryCard";
import Screen from "@/src/components/Screen/Screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";

export default function HistoryScreen() {
  const hasHistory = true;

  return (
    <Screen scrollable>
      <Text className="text-4xl font-roboto-bold">Histórico</Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8">
        Suas ultimas simulações
      </Text>

      {hasHistory ? <HistoryCard /> : <EmptyHistory />}
    </Screen>
  );
}

function EmptyHistory() {
  return (
    <View className="self-center items-center">
      <View className="h-16 w-16 bg-surface rounded-full items-center justify-center">
        <Ionicons name="receipt-outline" color={"555C6A"} size={24} />
      </View>

      <Text className="text-2xl font-roboto-bold mt-4">Fim do histórico</Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8 text-center">
        Faça novas simulações para comprar diferentes cenários de salário.
      </Text>
    </View>
  );
}
