import { api } from "@/src/api/apiConfig";
import {
  CalculatePayrollRequest,
  PayrollCalculationResult,
} from "@/src/domain/Payroll/payrollTypes";

async function calculatePayroll(payload: CalculatePayrollRequest) {
  const response = await api.post<PayrollCalculationResult>(
    "/payroll/calculate",
    payload,
  );

  return response.data;
}

export const payrollApi = {
  calculatePayroll,
};
