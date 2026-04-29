import {
  ComparePayrollRequest,
  PayrollComparisonResponse,
} from "@/src/domain/Payroll/payrollTypes";
import { payrollApi } from "@/src/domain/Payroll/payrollApi";
import { useMutation } from "@tanstack/react-query";

export function useComparePayroll() {
  return useMutation<
    PayrollComparisonResponse,
    Error,
    ComparePayrollRequest,
    unknown
  >({
    mutationFn: payrollApi.comparePayroll,
  });
}
