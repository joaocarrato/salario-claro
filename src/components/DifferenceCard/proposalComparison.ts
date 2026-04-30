export function getNetSalaryWinnerMessage(
  firstNetSalary: number,
  secondNetSalary: number,
) {
  if (firstNetSalary > secondNetSalary) {
    return "A proposta A paga mais no líquido";
  }

  if (secondNetSalary > firstNetSalary) {
    return "A proposta B paga mais no líquido";
  }

  return "As duas propostas pagam o mesmo líquido";
}
