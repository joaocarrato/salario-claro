export type StoreSimulationRequest = {
  title?: string | null;
  gross_salary: number;
  dependents?: number | null;
  transport_discount?: number | null;
  meal_discount?: number | null;
  health_plan_discount?: number | null;
  other_discounts?: number | null;
  calculation_year: number;
};

export type PayrollDiscounts = {
  inss: number;
  irrf: number;
  transport: number;
  meal: number;
  health_plan: number;
  other: number;
};

export type PayrollSimulation = {
  id: string;
  title: string | null;
  gross_salary: string;
  dependents: number;
  discounts: PayrollDiscounts;
  irrf_base: string;
  total_discounts: string;
  net_salary: string;
  effective_rate: string;
  calculation_year: number;
  created_at: string | null;
  updated_at: string | null;
};

export type PayrollSimulationResponse = {
  data: PayrollSimulation;
};

export type PayrollSimulationListResponse = {
  data: PayrollSimulation[];
};

export type ValidationErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};
