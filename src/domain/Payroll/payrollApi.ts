import { api } from "@/src/api/apiConfig";
import {
  CalculatePayrollRequest,
  ComparePayrollRequest,
  PayrollCalculationResult,
  PayrollComparisonResponse,
} from "@/src/domain/Payroll/payrollTypes";

async function calculatePayroll(payload: CalculatePayrollRequest) {
  const response = await api.post<PayrollCalculationResult>(
    "/payroll/calculate",
    payload,
  );

  return response.data;
}

async function comparePayroll(payload: ComparePayrollRequest) {
  const response = await api.post<PayrollComparisonResponse>(
    "/payroll/compare",
    payload,
  );

  return response.data;
}

export const payrollApi = {
  calculatePayroll,
  comparePayroll,
};
