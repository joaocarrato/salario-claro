import { Button } from "@/src/components/Button/Button";
import { CardInputForm } from "@/src/components/CardInputForm/CardInputForm";
import { NetSalaryCard } from "@/src/components/NetSalaryCard/NetSalaryCard";
import Screen from "@/src/components/Screen/Screen";
import {
  simulatorScreenSchema,
  simulatorScreenSchemaType,
} from "@/src/schema/simulatorScreenSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const $default_values: simulatorScreenSchemaType = {
  grossSalary: 0,
  dependents: 0,
  transportationVoucher: 0,
  mealVoucher: 0,
  healthPlan: 0,
  otherDeductions: 0,
};

export default function SimulatorScreen() {
  const { control, handleSubmit, formState } =
    useForm<simulatorScreenSchemaType>({
      resolver: zodResolver(simulatorScreenSchema),
      defaultValues: $default_values,
      mode: "onChange",
    });
  return (
    <Screen scrollable>
      <CardInputForm
        control={control}
        name="grossSalary"
        title="Informe seu salário bruto mensal"
        textInputProps={{ placeholder: "R$1500", keyboardType: "numeric" }}
        style={{ marginBottom: 16 }}
      />

      <CardInputForm
        control={control}
        name="dependents"
        title="Dependentes"
        cardStyle="smallCard"
        iconName="people"
        textInputProps={{ placeholder: "0", keyboardType: "numeric" }}
        style={{ marginBottom: 16 }}
      />

      <CardInputForm
        control={control}
        name="transportationVoucher"
        title="Vale transporte (%)"
        cardStyle="smallCard"
        iconName="bus"
        textInputProps={{ placeholder: "6%", keyboardType: "numeric" }}
        style={{ marginBottom: 16 }}
      />

      <CardInputForm
        control={control}
        name="mealVoucher"
        title="Vale Refeição (R$ Desconto)"
        cardStyle="smallCard"
        iconName="fast-food"
        textInputProps={{ placeholder: "0,00", keyboardType: "numeric" }}
        style={{ marginBottom: 16 }}
      />

      <CardInputForm
        control={control}
        name="healthPlan"
        title="Plano de Saúde (R$)"
        cardStyle="smallCard"
        iconName="medkit"
        textInputProps={{ placeholder: "0,00", keyboardType: "numeric" }}
        style={{ marginBottom: 16 }}
      />

      <CardInputForm
        control={control}
        name="otherDeductions"
        title="Outros Descontos (R$)"
        cardStyle="smallCard"
        iconName="document"
        textInputProps={{ placeholder: "0,00", keyboardType: "numeric" }}
      />

      <NetSalaryCard netSalary={1500} />

      <Button
        title="Calcular salário"
        iconName="calculator"
        style={{ marginBottom: 16 }}
      />
    </Screen>
  );
}
