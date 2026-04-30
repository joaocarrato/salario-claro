import {
  DEFAULT_CALCULATION_YEAR,
  buildCalculatePayrollPayload,
  buildComparePayrollPayload,
} from "@/src/domain/Payroll/payrollPayloadBuilders";

describe("payroll payload builders", () => {
  it("builds a calculate payroll payload", () => {
    const payload = buildCalculatePayrollPayload({
      grossSalary: 5000,
      dependents: 1,
      transportationVoucherPercentage: 6,
      mealVoucher: 300,
      healthPlan: 150,
      otherDeductions: 50,
    });

    expect(payload).toEqual({
      gross_salary: 5000,
      dependents: 1,
      transport_discount: 300,
      meal_discount: 300,
      health_plan_discount: 150,
      other_discounts: 50,
      calculation_year: DEFAULT_CALCULATION_YEAR,
    });
  });

  it("keeps optional calculate discounts as provided by the validated form data", () => {
    const payload = buildCalculatePayrollPayload({
      grossSalary: 455,
      dependents: 0,
      transportationVoucherPercentage: 0,
      mealVoucher: 0,
      healthPlan: 0,
      otherDeductions: 0,
    });

    expect(payload).toMatchObject({
      gross_salary: 455,
      dependents: 0,
      transport_discount: 0,
      meal_discount: 0,
      health_plan_discount: 0,
      other_discounts: 0,
      calculation_year: DEFAULT_CALCULATION_YEAR,
    });
  });

  it("builds a compare payroll payload for both proposals", () => {
    const payload = buildComparePayrollPayload("455,50", "1.500,25");

    expect(payload).toEqual({
      first: {
        gross_salary: 455.5,
        dependents: null,
        transport_discount: null,
        meal_discount: null,
        health_plan_discount: null,
        other_discounts: null,
      },
      second: {
        gross_salary: 1500.25,
        dependents: null,
        transport_discount: null,
        meal_discount: null,
        health_plan_discount: null,
        other_discounts: null,
      },
      calculation_year: DEFAULT_CALCULATION_YEAR,
    });
  });

  it("uses zero for empty compare salary inputs", () => {
    const payload = buildComparePayrollPayload("", "");

    expect(payload.first.gross_salary).toBe(0);
    expect(payload.second.gross_salary).toBe(0);
  });
});
