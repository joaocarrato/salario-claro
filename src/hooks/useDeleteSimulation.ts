import { getApiErrorMessage } from "@/src/api/apiErrors";
import { simulationApi } from "@/src/domain/Simulation/simulationApi";
import { simulationsQueryKey } from "@/src/hooks/useCreateSimulation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSimulation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, unknown>({
    mutationFn: simulationApi.deleteSimulation,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: simulationsQueryKey });
    },
  });
}

export function getDeleteSimulationErrorMessage(error: unknown) {
  return getApiErrorMessage(error, "excluir a simulação");
}
