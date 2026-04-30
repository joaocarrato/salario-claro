import {
  CalculatePayrollRequest,
  ComparePayrollRequest,
  PayrollInput,
} from "@/src/domain/Payroll/payrollTypes";
import { simulatorScreenSchemaType } from "@/src/schema/simulatorScreenSchema";
import { parseCurrencyInput } from "@/src/utils/currency";

export const DEFAULT_CALCULATION_YEAR = 2026;

export function buildCalculatePayrollPayload(
  data: simulatorScreenSchemaType,
): CalculatePayrollRequest {
  const transportationVoucherDeduction =
    data.grossSalary * (data.transportationVoucherPercentage / 100);

  return {
    gross_salary: data.grossSalary,
    dependents: data.dependents,
    transport_discount: transportationVoucherDeduction,
    meal_discount: data.mealVoucher,
    health_plan_discount: data.healthPlan,
    other_discounts: data.otherDeductions,
    calculation_year: DEFAULT_CALCULATION_YEAR,
  };
}

export function buildComparePayrollPayload(
  firstSalary: string,
  secondSalary: string,
): ComparePayrollRequest {
  return {
    first: buildComparePayrollInput(firstSalary),
    second: buildComparePayrollInput(secondSalary),
    calculation_year: DEFAULT_CALCULATION_YEAR,
  };
}

function buildComparePayrollInput(grossSalary: string): PayrollInput {
  return {
    gross_salary: parseCurrencyInput(grossSalary),
    dependents: null,
    transport_discount: null,
    meal_discount: null,
    health_plan_discount: null,
    other_discounts: null,
  };
}
