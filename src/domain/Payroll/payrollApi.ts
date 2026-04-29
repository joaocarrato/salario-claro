import { api } from "@/src/api/apiConfig";

export type PayrollCalculate = {
  gross_salary: number;
  dependents: number;
  transport_discount: number;
  meal_discount: number;
  health_plan_discount: number;
  other_discounts: number;
  calculation_year: 2026;
};

async function calculate({
  gross_salary,
  dependents,
  transport_discount,
  meal_discount,
  health_plan_discount,
  other_discounts,
  calculation_year,
}: PayrollCalculate) {
  const response = await api.post("payroll/calculate", {
    gross_salary,
    dependents,
    transport_discount,
    meal_discount,
    health_plan_discount,
    other_discounts,
    calculation_year,
  });

  return response.data;
}

export const payrollApi = { calculate };
