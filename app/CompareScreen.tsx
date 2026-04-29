import { Button } from "@/src/components/Button/Button";
import { CompareCard } from "@/src/components/CompareCard/CompareCard";
import { DifferenceCard } from "@/src/components/DifferenceCard/DifferenceCard";
import Screen from "@/src/components/Screen/Screen";
import { ComparePayrollRequest } from "@/src/domain/Payroll/payrollTypes";
import { getPayrollErrorMessage } from "@/src/hooks/useCalculatePayroll";
import { useComparePayroll } from "@/src/hooks/useComparePayroll";
import { useState } from "react";
import { Text } from "react-native";

const DEFAULT_CALCULATION_YEAR = 2026;

function parseCurrencyInput(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ",").trim();

  if (!normalized) return 0;

  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function CompareScreen() {
  const [firstSalary, setFirstSalary] = useState("");
  const [secondSalary, setSecondSalary] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const comparePayrollMutation = useComparePayroll();

  const canCompare = firstSalary.trim() !== "" && secondSalary.trim() !== "";

  async function handleCompare() {
    const payload: ComparePayrollRequest = {
      first: {
        gross_salary: parseCurrencyInput(firstSalary),
        dependents: null,
        transport_discount: null,
        meal_discount: null,
        health_plan_discount: null,
        other_discounts: null,
      },
      second: {
        gross_salary: parseCurrencyInput(secondSalary),
        dependents: null,
        transport_discount: null,
        meal_discount: null,
        health_plan_discount: null,
        other_discounts: null,
      },
      calculation_year: DEFAULT_CALCULATION_YEAR,
    };

    setErrorMessage(null);

    try {
      await comparePayrollMutation.mutateAsync(payload);
    } catch (error) {
      const message = getPayrollErrorMessage(error, "comparar");
      setErrorMessage(message);
    }
  }

  const comparisonResult = comparePayrollMutation.data;

  return (
    <Screen scrollable>
      <Text className="text-4xl font-roboto-bold">Comparar propostas</Text>
      <Text className="text-lg font-roboto color-subtitle mt-2 mb-8">
        Veja a diferença real entre dois salários
      </Text>

      <CompareCard
        type="primary"
        inputLabel="Salário Bruto"
        boxProps={{ marginBottom: 16 }}
        disabled={!comparisonResult}
        inssValue={comparisonResult?.first.discounts.inss}
        irrfValue={comparisonResult?.first.discounts.irrf}
        netSalary={comparisonResult?.first.net_salary}
        inputProps={{
          placeholder: "R$1500",
          keyboardType: "numeric",
          value: firstSalary,
          onChangeText: setFirstSalary,
        }}
      />

      <CompareCard
        type="secondary"
        inputLabel="Salário Bruto"
        boxProps={{ marginBottom: 16 }}
        disabled={!comparisonResult}
        inssValue={comparisonResult?.second.discounts.inss}
        irrfValue={comparisonResult?.second.discounts.irrf}
        netSalary={comparisonResult?.second.net_salary}
        inputProps={{
          placeholder: "R$2000",
          keyboardType: "numeric",
          value: secondSalary,
          onChangeText: setSecondSalary,
        }}
      />

      {comparisonResult ? (
        <DifferenceCard
          firstNetSalary={comparisonResult.first.net_salary}
          secondNetSalary={comparisonResult.second.net_salary}
          netSalaryDifference={comparisonResult.difference.net_salary}
          grossSalaryDifference={comparisonResult.difference.gross_salary}
          deductionDifference={comparisonResult.difference.total_discounts}
        />
      ) : null}

      {errorMessage ? (
        <Text className="text-sm color-deduction font-roboto mb-4">
          {errorMessage}
        </Text>
      ) : null}

      <Button
        title={
          comparePayrollMutation.isPending
            ? "Comparando..."
            : "Comparar salários"
        }
        iconName="swap-horizontal"
        variant={!canCompare ? "disabled" : "primary"}
        disabled={!canCompare || comparePayrollMutation.isPending}
        loading={comparePayrollMutation.isPending}
        onPress={handleCompare}
      />
    </Screen>
  );
}
