import { Button } from "@/src/components/Button/Button";
import { CompareCard } from "@/src/components/CompareCard/CompareCard";
import { DifferenceCard } from "@/src/components/DifferenceCard/DifferenceCard";
import Screen from "@/src/components/Screen/Screen";
import { Text } from "react-native";

export default function CompareScreen() {
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
      />

      <CompareCard
        type="secondary"
        inputLabel="Salário Bruto"
        boxProps={{ marginBottom: 16 }}
      />

      <DifferenceCard
        netSalaryDifference={400}
        grossSalaryDifference={600}
        deductionDifference={200}
      />

      <Button title="Comparar salários" iconName="swap-horizontal" />
    </Screen>
  );
}
