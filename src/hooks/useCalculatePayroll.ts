import { getApiErrorMessage } from "@/src/api/apiErrors";
import {
  CalculatePayrollRequest,
  PayrollCalculationResult,
} from "@/src/domain/Payroll/payrollTypes";
import { payrollApi } from "@/src/domain/Payroll/payrollApi";
import { useMutation } from "@tanstack/react-query";

export function useCalculatePayroll() {
  return useMutation<
    PayrollCalculationResult,
    Error,
    CalculatePayrollRequest,
    unknown
  >({
    mutationFn: payrollApi.calculatePayroll,
  });
}

export function getPayrollErrorMessage(
  error: unknown,
  action = "calcular o salário",
) {
  return getApiErrorMessage(error, action);
}
