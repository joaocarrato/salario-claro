import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  clearLatestPayrollCalculation,
  loadLatestPayrollCalculation,
  saveLatestPayrollCalculation,
} from "@/src/storage/latestPayrollCalculationStorage";

import type { LatestPayrollCalculation } from "@/src/hooks/useCalculatePayroll";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

const latestCalculation: LatestPayrollCalculation = {
  calculatedAt: "2026-05-12T10:00:00.000Z",
  result: {
    gross_salary: 5000,
    discounts: {
      inss: 550,
      irrf: 120,
      transport: 0,
      meal: 0,
      health_plan: 0,
      other: 0,
    },
    irrf_base: 4450,
    total_discounts: 670,
    net_salary: 4330,
    effective_rate: 13.4,
    calculation_year: 2026,
    calculation_steps: [],
  },
};

describe("latest payroll calculation storage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("persists and loads the latest payroll calculation", async () => {
    await saveLatestPayrollCalculation(latestCalculation);

    await expect(loadLatestPayrollCalculation()).resolves.toEqual(
      latestCalculation,
    );
  });

  it("returns null when there is no stored calculation", async () => {
    await expect(loadLatestPayrollCalculation()).resolves.toBeNull();
  });

  it("clears the stored calculation", async () => {
    await saveLatestPayrollCalculation(latestCalculation);
    await clearLatestPayrollCalculation();

    await expect(loadLatestPayrollCalculation()).resolves.toBeNull();
  });

  it("ignores invalid stored data", async () => {
    await AsyncStorage.setItem(
      "@salario-claro/latest-payroll-calculation",
      JSON.stringify({ result: null }),
    );

    await expect(loadLatestPayrollCalculation()).resolves.toBeNull();
  });
});
