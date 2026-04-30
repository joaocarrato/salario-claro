import z from "zod";

function parseNumericInput(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return value;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 0;
  }

  const normalizedValue = trimmedValue.replace(",", ".");
  const parsedValue = Number(normalizedValue);

  return Number.isNaN(parsedValue) ? value : parsedValue;
}

function parseOptionalNumericInput(defaultValue = 0) {
  return (value: unknown) => {
    if (typeof value === "string" && !value.trim()) {
      return defaultValue;
    }

    return parseNumericInput(value);
  };
}

function parseRequiredNumericInput(value: unknown) {
  if (typeof value === "string" && !value.trim()) {
    return value;
  }

  return parseNumericInput(value);
}

const requiredPositiveNumber = z.preprocess(
  parseRequiredNumericInput,
  z.number().positive("Informe um valor maior que zero"),
);

function optionalNonNegativeNumber(defaultValue = 0) {
  return z.preprocess(
    parseOptionalNumericInput(defaultValue),
    z.number().nonnegative("Informe um valor maior ou igual a zero"),
  );
}

export const simulatorScreenSchema = z.object({
  grossSalary: requiredPositiveNumber,
  dependents: optionalNonNegativeNumber(),
  transportationVoucherPercentage: optionalNonNegativeNumber(6),
  mealVoucher: optionalNonNegativeNumber(),
  healthPlan: optionalNonNegativeNumber(),
  otherDeductions: optionalNonNegativeNumber(),
});

export type simulatorScreenSchemaType = z.infer<typeof simulatorScreenSchema>;
export type simulatorScreenSchemaInput = z.input<typeof simulatorScreenSchema>;
