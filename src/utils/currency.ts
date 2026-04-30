export function formatCurrency(value = 0) {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
    .format(Math.abs(value))
    .replace(/\u00a0/g, " ");

  return value < 0 ? `- ${formattedValue}` : formattedValue;
}

export function formatDeductionCurrency(value = 0) {
  return `- ${formatCurrency(value)}`;
}

export function parseCurrencyInput(value: string) {
  const normalizedValue = value.trim().replace(/\./g, "").replace(",", ".");

  if (!normalizedValue) {
    return 0;
  }

  const parsedValue = Number(normalizedValue);
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}
