import { HistoryCard } from "@/src/components/HistoryCard/HistoryCard";
import {
  ProposeCard,
  ProposeCardProps,
} from "@/src/components/ProposeCard/ProposeCard";
import Screen from "@/src/components/Screen/Screen";
import { PayrollSimulation } from "@/src/domain/Simulation/simulationTypes";
import {
  LatestPayrollCalculation,
  useLatestPayrollCalculation,
} from "@/src/hooks/useCalculatePayroll";
import {
  getDeleteSimulationErrorMessage,
  useDeleteSimulation,
} from "@/src/hooks/useDeleteSimulation";
import { useSimulations } from "@/src/hooks/useSimulations";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useMemo } from "react";
import { Alert, Pressable, RefreshControl, Text, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function HistoryScreen() {
  const {
    data: simulations,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useSimulations();
  const deleteSimulationMutation = useDeleteSimulation();
  const latestCalculationQuery = useLatestPayrollCalculation();
  const latestHistorySimulation = useMemo(
    () => mapCalculationToHistoryCard(latestCalculationQuery.data),
    [latestCalculationQuery.data],
  );
  const savedProposalCards = useMemo(
    () => mapSavedSimulationsToProposeCards(simulations),
    [simulations],
  );
  const shouldShowEmptyHistory =
    !latestHistorySimulation &&
    !savedProposalCards.length &&
    !isLoading &&
    !latestCalculationQuery.isLoading;

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleDeleteSimulation = useCallback(
    (id: string) => {
      Alert.alert("Excluir simulação?", "Essa ação não pode ser desfeita.", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSimulationMutation.mutateAsync(id);
            } catch (error) {
              Alert.alert(
                "Não foi possível excluir",
                getDeleteSimulationErrorMessage(error),
              );
            }
          },
        },
      ]);
    },
    [deleteSimulationMutation],
  );

  return (
    <Screen
      scrollable
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
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

      {latestHistorySimulation ? (
        <HistoryCard simulation={latestHistorySimulation} />
      ) : (
        shouldShowEmptyHistory && <EmptyHistory />
      )}

      {savedProposalCards.length ? (
        <View className="mt-6">
          <Text className="text-2xl font-roboto-bold color-secondary">
            Simulações salvas
          </Text>

          {savedProposalCards.map(({ id, props }) => (
            <SwipeableSimulationCard
              key={id}
              disabled={deleteSimulationMutation.isPending}
              onDelete={() => handleDeleteSimulation(id)}
            >
              <ProposeCard {...props} />
            </SwipeableSimulationCard>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

function SwipeableSimulationCard({
  children,
  disabled,
  onDelete,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onDelete: () => void;
}) {
  return (
    <ReanimatedSwipeable
      enabled={!disabled}
      friction={2}
      overshootRight={false}
      rightThreshold={40}
      renderRightActions={() => (
        <View className="w-28 mt-4 ml-3 rounded-lg overflow-hidden">
          <Pressable
            className={`flex-1 bg-deduction items-center justify-center px-3 ${
              disabled ? "opacity-60" : ""
            }`}
            disabled={disabled}
            onPress={onDelete}
          >
            <Ionicons name="trash-outline" size={20} color={"#FFFFFF"} />
            <Text className="text-white font-roboto-bold mt-1">Excluir</Text>
          </Pressable>
        </View>
      )}
    >
      {children}
    </ReanimatedSwipeable>
  );
}

type SavedProposalCard = {
  id: string;
  props: ProposeCardProps;
};

function mapSavedSimulationsToProposeCards(
  simulations?: PayrollSimulation[],
): SavedProposalCard[] {
  if (!simulations?.length) {
    return [];
  }

  return [...simulations]
    .sort(
      (first, second) => getSimulationTime(second) - getSimulationTime(first),
    )
    .map((simulation) => ({
      id: simulation.id,
      props: {
        title: simulation.title || "Simulação salva",
        tag: "saved",
        dateLabel: formatSimulationDate(
          simulation.created_at ?? simulation.updated_at,
        ),
        grossSalary: parseSimulationNumber(simulation.gross_salary),
        netSalary: parseSimulationNumber(simulation.net_salary),
        totalDiscounts: parseSimulationNumber(simulation.total_discounts),
        discountsDescription: getDiscountsDescription(simulation),
      },
    }));
}

function mapCalculationToHistoryCard(
  latestCalculation?: LatestPayrollCalculation | null,
) {
  if (!latestCalculation) {
    return null;
  }

  return {
    grossSalary: latestCalculation.result.gross_salary,
    netSalary: latestCalculation.result.net_salary,
    createdAt: latestCalculation.calculatedAt,
  };
}

function getSimulationTime(simulation: PayrollSimulation) {
  return getDateTime(simulation.created_at ?? simulation.updated_at);
}

function getDateTime(date: string | null) {
  if (!date) {
    return 0;
  }

  const time = new Date(date).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function parseSimulationNumber(value: string) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function formatSimulationDate(value: string | null) {
  if (!value) {
    return "Recente";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recente";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getDiscountsDescription(simulation: PayrollSimulation) {
  const discounts = [
    { label: "INSS", value: simulation.discounts.inss },
    { label: "IRRF", value: simulation.discounts.irrf },
    { label: "Vale transporte", value: simulation.discounts.transport },
    { label: "Vale refeição", value: simulation.discounts.meal },
    { label: "Plano de saúde", value: simulation.discounts.health_plan },
    { label: "Outros", value: simulation.discounts.other },
  ];

  const activeDiscounts = discounts
    .filter((discount) => discount.value > 0)
    .map((discount) => discount.label);

  return activeDiscounts.length ? activeDiscounts.join(", ") : "sem descontos";
}

function EmptyHistory() {
  return (
    <View className="self-center items-center">
      <View className="h-16 w-16 bg-surface rounded-full items-center justify-center">
        <Ionicons name="receipt-outline" color={"#555C6A"} size={24} />
      </View>

      <Text className="text-2xl font-roboto-bold mt-4">Fim do histórico</Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8 text-center">
        Faça novas simulações para comprar diferentes cenários de salário.
      </Text>
    </View>
  );
}
