import { getNetSalaryWinnerMessage } from "@/src/components/DifferenceCard/proposalComparison";

describe("getNetSalaryWinnerMessage", () => {
  it("returns proposal A as the winner when the first net salary is higher", () => {
    expect(getNetSalaryWinnerMessage(3000, 2500)).toBe(
      "A proposta A paga mais no líquido",
    );
  });

  it("returns proposal B as the winner when the second net salary is higher", () => {
    expect(getNetSalaryWinnerMessage(2500, 3000)).toBe(
      "A proposta B paga mais no líquido",
    );
  });

  it("returns an equal message when both net salaries are the same", () => {
    expect(getNetSalaryWinnerMessage(3000, 3000)).toBe(
      "As duas propostas pagam o mesmo líquido",
    );
  });
});
