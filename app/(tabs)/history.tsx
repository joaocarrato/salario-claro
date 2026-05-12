import { HistoryCard } from "@/src/components/HistoryCard/HistoryCard";
import { ProposeCard } from "@/src/components/ProposeCard/ProposeCard";
import Screen from "@/src/components/Screen/Screen";
import { PayrollSimulation } from "@/src/domain/Simulation/simulationTypes";
import { useSimulations } from "@/src/hooks/useSimulations";
import { currentSalaryProposalMock } from "@/src/utils/proposeCardMock";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useMemo } from "react";
import { RefreshControl, Text, View } from "react-native";

export default function HistoryScreen() {
  const {
    data: simulations,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useSimulations();
  const latestSimulation = useMemo(
    () => getLatestSimulation(simulations),
    [simulations],
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Screen
      scrollable
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={handleRefresh}
        />
      }
    >
      <Text className="text-4xl font-roboto-bold">Histórico</Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8">
        Suas ultimas simulações
      </Text>

      {isLoading ? (
        <Text className="text-lg font-roboto color-subtitle">
          Carregando histórico...
        </Text>
      ) : null}

      {isError ? (
        <Text className="text-sm color-deduction font-roboto mb-4">
          Não foi possível carregar o histórico agora.
        </Text>
      ) : null}

      {latestSimulation ? (
        <HistoryCard simulation={latestSimulation} />
      ) : (
        !isLoading && <EmptyHistory />
      )}

      <ProposeCard {...currentSalaryProposalMock} />
    </Screen>
  );
}

function getLatestSimulation(simulations?: PayrollSimulation[]) {
  if (!simulations?.length) {
    return null;
  }

  return [...simulations].sort((first, second) => {
    return getSimulationTime(second) - getSimulationTime(first);
  })[0];
}

function getSimulationTime(simulation: PayrollSimulation) {
  const date = simulation.created_at ?? simulation.updated_at;

  if (!date) {
    return 0;
  }

  const time = new Date(date).getTime();

  return Number.isNaN(time) ? 0 : time;
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
