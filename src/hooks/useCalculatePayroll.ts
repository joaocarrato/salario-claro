import {
  ApiValidationError,
  CalculatePayrollRequest,
  PayrollCalculationResult,
} from "@/src/domain/Payroll/payrollTypes";
import { payrollApi } from "@/src/domain/Payroll/payrollApi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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

export function getPayrollErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Erro de rede. Verifique se a API está rodando e se a base URL está correta.";
    }

    if (error.response.status === 422) {
      const data = error.response.data as ApiValidationError | undefined;
      const firstFieldError = data?.errors
        ? Object.values(data.errors).flat()[0]
        : undefined;

      return firstFieldError || data?.message || "Dados inválidos para cálculo.";
    }

    return "Não foi possível calcular o salário agora. Tente novamente.";
  }

  return "Erro inesperado ao calcular salário.";
}
