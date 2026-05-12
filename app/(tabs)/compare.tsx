import { Button } from "@/src/components/Button/Button";
import { CompareCard } from "@/src/components/CompareCard/CompareCard";
import { DifferenceCard } from "@/src/components/DifferenceCard/DifferenceCard";
import Screen from "@/src/components/Screen/Screen";
import { buildComparePayrollPayload } from "@/src/domain/Payroll/payrollPayloadBuilders";
import { getPayrollErrorMessage } from "@/src/hooks/useCalculatePayroll";
import { useComparePayroll } from "@/src/hooks/useComparePayroll";
import { useState } from "react";
import { RefreshControl, Text } from "react-native";

const INITIAL_COMPARE_FORM = {
  firstSalary: "",
  secondSalary: "",
};

export default function CompareScreen() {
  const [firstSalary, setFirstSalary] = useState(
    INITIAL_COMPARE_FORM.firstSalary,
  );
  const [secondSalary, setSecondSalary] = useState(
    INITIAL_COMPARE_FORM.secondSalary,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const comparePayrollMutation = useComparePayroll();

  const canCompare = firstSalary.trim() !== "" && secondSalary.trim() !== "";

  function resetCompareForm() {
    setFirstSalary(INITIAL_COMPARE_FORM.firstSalary);
    setSecondSalary(INITIAL_COMPARE_FORM.secondSalary);
    setErrorMessage(null);
  }

  function handlePullToReset() {
    resetCompareForm();
    comparePayrollMutation.reset();
  }

  async function handleCompare() {
    const payload = buildComparePayrollPayload(firstSalary, secondSalary);

    setErrorMessage(null);

    try {
      await comparePayrollMutation.mutateAsync(payload);
      resetCompareForm();
    } catch (error) {
      const message = getPayrollErrorMessage(error, "comparar os salários");
      setErrorMessage(message);
    }
  }

  const comparisonResult = comparePayrollMutation.data;

  return (
    <Screen
      scrollable
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handlePullToReset} />
      }
    >
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
          placeholder: "1500",
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
          placeholder: "2000",
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
