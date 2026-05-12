import { api } from "@/src/api/apiConfig";
import {
  PayrollSimulationListResponse,
  PayrollSimulation,
  PayrollSimulationResponse,
  StoreSimulationRequest,
} from "@/src/domain/Simulation/simulationTypes";

async function createSimulation(
  payload: StoreSimulationRequest,
): Promise<PayrollSimulation> {
  const response = await api.post<PayrollSimulationResponse>(
    "/simulations",
    payload,
  );

  return response.data.data;
}

async function listSimulations(): Promise<PayrollSimulation[]> {
  const response =
    await api.get<PayrollSimulationListResponse>("/simulations");

  return response.data.data;
}

async function deleteSimulation(id: string): Promise<void> {
  await api.delete(`/simulations/${id}`);
}

export const simulationApi = {
  createSimulation,
  deleteSimulation,
  listSimulations,
};
