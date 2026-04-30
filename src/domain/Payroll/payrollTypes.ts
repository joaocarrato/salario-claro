export type PayrollInput = {
  gross_salary: number;
  dependents: number | null;
  transport_discount: number | null;
  meal_discount: number | null;
  health_plan_discount: number | null;
  other_discounts: number | null;
};

export type CalculatePayrollRequest = PayrollInput & {
  calculation_year: number;
};

export type ComparePayrollRequest = {
  first: PayrollInput;
  second: PayrollInput;
  calculation_year: number;
};

export type PayrollCalculationDiscounts = {
  inss: number;
  irrf: number;
  transport: number;
  meal: number;
  health_plan: number;
  other: number;
};

export type PayrollCalculationStep = {
  step: string;
  output: Record<string, unknown>;
};

export type PayrollCalculationResult = {
  gross_salary: number;
  discounts: PayrollCalculationDiscounts;
  irrf_base: number;
  total_discounts: number;
  net_salary: number;
  effective_rate: number;
  calculation_year: number;
  calculation_steps: PayrollCalculationStep[];
};

export type PayrollComparisonDifference = {
  gross_salary: number;
  net_salary: number;
  total_discounts: number;
};

export type PayrollComparisonResponse = {
  first: PayrollCalculationResult;
  second: PayrollCalculationResult;
  difference: PayrollComparisonDifference;
};

export type ApiValidationError = {
  message: string;
  errors: Record<string, string[]>;
};
