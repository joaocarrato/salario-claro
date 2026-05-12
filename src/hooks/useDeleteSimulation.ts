import { getApiErrorMessage } from "@/src/api/apiErrors";
import { simulationApi } from "@/src/domain/Simulation/simulationApi";
import { PayrollSimulation } from "@/src/domain/Simulation/simulationTypes";
import { simulationsQueryKey } from "@/src/hooks/useCreateSimulation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSimulation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, unknown>({
    mutationFn: simulationApi.deleteSimulation,
    onSuccess(_, deletedSimulationId) {
      queryClient.setQueryData<PayrollSimulation[]>(
        simulationsQueryKey,
        (simulations) => {
          if (!simulations) {
            return simulations;
          }

          return simulations.filter(
            (simulation) => simulation.id !== deletedSimulationId,
          );
        },
      );
      queryClient.invalidateQueries({
        queryKey: simulationsQueryKey,
        refetchType: "none",
      });
    },
  });
}

export function getDeleteSimulationErrorMessage(error: unknown) {
  return getApiErrorMessage(error, "excluir a simulação");
}
