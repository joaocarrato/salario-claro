import { simulationApi } from "@/src/domain/Simulation/simulationApi";
import { PayrollSimulation } from "@/src/domain/Simulation/simulationTypes";
import { simulationsQueryKey } from "@/src/hooks/useCreateSimulation";
import { useQuery } from "@tanstack/react-query";

export function useSimulations() {
  return useQuery<PayrollSimulation[]>({
    queryKey: simulationsQueryKey,
    queryFn: simulationApi.listSimulations,
    staleTime: Infinity,
  });
}
