/// <reference types="jest" />

import {
  formatCurrency,
  formatDeductionCurrency,
  parseCurrencyInput,
} from "@/src/utils/currency";

describe("currency helpers", () => {
  describe("formatCurrency", () => {
    it("formats a positive value as Brazilian currency", () => {
      expect(formatCurrency(455)).toBe("R$ 455,00");
    });

    it("formats a negative value with the minus sign before the currency symbol", () => {
      expect(formatCurrency(-455)).toBe("- R$ 455,00");
    });

    it("formats zero as Brazilian currency", () => {
      expect(formatCurrency(0)).toBe("R$ 0,00");
    });
  });

  describe("formatDeductionCurrency", () => {
    it("formats deductions with a leading minus sign", () => {
      expect(formatDeductionCurrency(455)).toBe("- R$ 455,00");
    });
  });

  describe("parseCurrencyInput", () => {
    it("converts an empty string to zero", () => {
      expect(parseCurrencyInput("")).toBe(0);
    });

    it("converts an integer string to a number", () => {
      expect(parseCurrencyInput("455")).toBe(455);
    });

    it("supports comma decimal input", () => {
      expect(parseCurrencyInput("455,50")).toBe(455.5);
    });

    it("does not crash on invalid input", () => {
      expect(parseCurrencyInput("abc")).toBe(0);
    });
  });
});
