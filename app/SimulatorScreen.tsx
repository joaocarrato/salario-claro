import { Button } from "@/src/components/Button/Button";
import { CardInputForm } from "@/src/components/CardInputForm/CardInputForm";
import { NetSalaryCard } from "@/src/components/NetSalaryCard/NetSalaryCard";
import Screen from "@/src/components/Screen/Screen";
import { payrollApi, PayrollCalculate } from "@/src/domain/Payroll/payrollApi";
import {
  simulatorScreenSchema,
  simulatorScreenSchemaInput,
  simulatorScreenSchemaType,
} from "@/src/schema/simulatorScreenSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const $default_values: simulatorScreenSchemaInput = {
  grossSalary: "",
  dependents: "",
  transportationVoucherPercentage: "6",
  mealVoucher: "",
  healthPlan: "",
  otherDeductions: "",
};

export default function SimulatorScreen() {
  const { control, handleSubmit, formState } =
    useForm<simulatorScreenSchemaInput, unknown, simulatorScreenSchemaType>({
      resolver: zodResolver(simulatorScreenSchema),
      defaultValues: $default_values,
      mode: "onChange",
    });

  async function onSubmit(data: simulatorScreenSchemaType) {
    const transportationVoucherDeduction =
      data.grossSalary * (data.transportationVoucherPercentage / 100);

    const payload: PayrollCalculate = {
      gross_salary: data.grossSalary,
      dependents: data.dependents,
      transport_discount: transportationVoucherDeduction,
      meal_discount: data.mealVoucher,
      health_plan_discount: data.healthPlan,
      other_discounts: data.otherDeductions,
      calculation_year: 2026,
    };

    await payrollApi.calculate(payload);

    console.log("Form data:", data);
    console.log("Backend payload:", payload);
    console.log("Form is valid:", formState.isValid);
  }

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
        name="transportationVoucherPercentage"
        title="Vale transporte (%)"
        cardStyle="smallCard"
        iconName="bus"
        textInputProps={{ placeholder: "6", keyboardType: "numeric" }}
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
        variant={!formState.isValid ? "outline" : "primary"}
        disabled={!formState.isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </Screen>
  );
}
