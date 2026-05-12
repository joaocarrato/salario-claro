import { HistoryCard } from "@/src/components/HistoryCard/HistoryCard";
import Screen from "@/src/components/Screen/Screen";
import React from "react";
import { Text } from "react-native";

export default function HistoryScreen() {
  return (
    <Screen>
      <Text className="text-4xl font-roboto-bold">Histórico</Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8">
        Suas ultimas simulações
      </Text>

      <HistoryCard />
    </Screen>
  );
}
