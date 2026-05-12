import { getApiErrorMessage } from "@/src/api/apiErrors";
import { simulationApi } from "@/src/domain/Simulation/simulationApi";
import {
  PayrollSimulation,
  StoreSimulationRequest,
} from "@/src/domain/Simulation/simulationTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const simulationsQueryKey = ["simulations"];

export function useCreateSimulation() {
  const queryClient = useQueryClient();

  return useMutation<
    PayrollSimulation,
    Error,
    StoreSimulationRequest,
    unknown
  >({
    mutationFn: simulationApi.createSimulation,
    onSuccess(createdSimulation) {
      queryClient.setQueryData<PayrollSimulation[]>(
        simulationsQueryKey,
        (simulations) => {
          if (!simulations) {
            return [createdSimulation];
          }

          const simulationsWithoutDuplicate = simulations.filter(
            (simulation) => simulation.id !== createdSimulation.id,
          );

          return [createdSimulation, ...simulationsWithoutDuplicate];
        },
      );
      queryClient.invalidateQueries({
        queryKey: simulationsQueryKey,
        refetchType: "none",
      });
    },
  });
}

export function getCreateSimulationErrorMessage(error: unknown) {
  return getApiErrorMessage(error, "salvar a simulação");
}
