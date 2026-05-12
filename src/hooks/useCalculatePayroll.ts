import { getApiErrorMessage } from "@/src/api/apiErrors";
import {
  CalculatePayrollRequest,
  PayrollCalculationResult,
} from "@/src/domain/Payroll/payrollTypes";
import { payrollApi } from "@/src/domain/Payroll/payrollApi";
import {
  loadLatestPayrollCalculation,
  saveLatestPayrollCalculation,
} from "@/src/storage/latestPayrollCalculationStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type LatestPayrollCalculation = {
  result: PayrollCalculationResult;
  calculatedAt: string;
};

export const latestPayrollCalculationQueryKey = ["latest-payroll-calculation"];

export function useCalculatePayroll() {
  const queryClient = useQueryClient();

  return useMutation<
    PayrollCalculationResult,
    Error,
    CalculatePayrollRequest,
    unknown
  >({
    mutationFn: payrollApi.calculatePayroll,
    onSuccess(result) {
      const latestCalculation = {
        result,
        calculatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<LatestPayrollCalculation>(
        latestPayrollCalculationQueryKey,
        latestCalculation,
      );
      void saveLatestPayrollCalculation(latestCalculation).catch(() => {});
    },
  });
}

export function useLatestPayrollCalculation() {
  return useQuery<LatestPayrollCalculation | null>({
    queryKey: latestPayrollCalculationQueryKey,
    queryFn: loadLatestPayrollCalculation,
    staleTime: Infinity,
  });
}

export function getPayrollErrorMessage(
  error: unknown,
  action = "calcular o salário",
) {
  return getApiErrorMessage(error, action);
}
