import AsyncStorage from "@react-native-async-storage/async-storage";

import type { LatestPayrollCalculation } from "@/src/hooks/useCalculatePayroll";

const LATEST_PAYROLL_CALCULATION_STORAGE_KEY =
  "@salario-claro/latest-payroll-calculation";

export async function saveLatestPayrollCalculation(
  latestCalculation: LatestPayrollCalculation,
) {
  await AsyncStorage.setItem(
    LATEST_PAYROLL_CALCULATION_STORAGE_KEY,
    JSON.stringify(latestCalculation),
  );
}

export async function loadLatestPayrollCalculation() {
  try {
    const storedCalculation = await AsyncStorage.getItem(
      LATEST_PAYROLL_CALCULATION_STORAGE_KEY,
    );

    if (!storedCalculation) {
      return null;
    }

    const parsedCalculation = JSON.parse(storedCalculation) as unknown;

    if (!isLatestPayrollCalculation(parsedCalculation)) {
      await clearLatestPayrollCalculation();
      return null;
    }

    return parsedCalculation;
  } catch {
    await clearLatestPayrollCalculation();
    return null;
  }
}

export async function clearLatestPayrollCalculation() {
  await AsyncStorage.removeItem(LATEST_PAYROLL_CALCULATION_STORAGE_KEY);
}

function isLatestPayrollCalculation(
  value: unknown,
): value is LatestPayrollCalculation {
  if (!isRecord(value) || typeof value.calculatedAt !== "string") {
    return false;
  }

  const result = value.result;
  const discounts = isRecord(result) ? result.discounts : null;

  return (
    isRecord(result) &&
    isFiniteNumber(result.gross_salary) &&
    isFiniteNumber(result.net_salary) &&
    isFiniteNumber(result.total_discounts) &&
    isFiniteNumber(result.irrf_base) &&
    isFiniteNumber(result.effective_rate) &&
    isFiniteNumber(result.calculation_year) &&
    isRecord(discounts) &&
    isFiniteNumber(discounts.inss) &&
    isFiniteNumber(discounts.irrf) &&
    isFiniteNumber(discounts.transport) &&
    isFiniteNumber(discounts.meal) &&
    isFiniteNumber(discounts.health_plan) &&
    isFiniteNumber(discounts.other)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
