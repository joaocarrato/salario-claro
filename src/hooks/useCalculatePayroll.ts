import { getApiErrorMessage } from "@/src/api/apiErrors";
import {
  CalculatePayrollRequest,
  PayrollCalculationResult,
} from "@/src/domain/Payroll/payrollTypes";
import { payrollApi } from "@/src/domain/Payroll/payrollApi";
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
      queryClient.setQueryData<LatestPayrollCalculation>(
        latestPayrollCalculationQueryKey,
        {
          result,
          calculatedAt: new Date().toISOString(),
        },
      );
    },
  });
}

export function useLatestPayrollCalculation() {
  return useQuery<LatestPayrollCalculation | null>({
    queryKey: latestPayrollCalculationQueryKey,
    queryFn: () => null,
    initialData: null,
    staleTime: Infinity,
  });
}

export function getPayrollErrorMessage(
  error: unknown,
  action = "calcular o salário",
) {
  return getApiErrorMessage(error, action);
}
