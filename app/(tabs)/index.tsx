import {
  BottomSheet,
  BottomSheetFormData,
} from "@/src/components/BottomSheet/BottomSheet";
import { Button } from "@/src/components/Button/Button";
import { CardInputForm } from "@/src/components/CardInputForm/CardInputForm";
import { NetSalaryCard } from "@/src/components/NetSalaryCard/NetSalaryCard";
import Screen from "@/src/components/Screen/Screen";
import {
  buildCalculatePayrollPayload,
  buildStoreSimulationPayload,
} from "@/src/domain/Payroll/payrollPayloadBuilders";
import { PayrollCalculationResult } from "@/src/domain/Payroll/payrollTypes";
import { StoreSimulationRequest } from "@/src/domain/Simulation/simulationTypes";
import {
  getCreateSimulationErrorMessage,
  useCreateSimulation,
} from "@/src/hooks/useCreateSimulation";
import {
  getPayrollErrorMessage,
  useCalculatePayroll,
} from "@/src/hooks/useCalculatePayroll";
import {
  simulatorScreenSchema,
  simulatorScreenSchemaInput,
  simulatorScreenSchemaType,
} from "@/src/schema/simulatorScreenSchema";
import { formatCurrency, formatDeductionCurrency } from "@/src/utils/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RefreshControl, Text, View } from "react-native";

const INITIAL_SIMULATION_FORM: simulatorScreenSchemaInput = {
  grossSalary: "",
  dependents: "",
  transportationVoucherPercentage: "6",
  mealVoucher: "",
  healthPlan: "",
  otherDeductions: "",
};

export default function SimulatorScreen() {
  const [result, setResult] = useState<PayrollCalculationResult | null>(null);
  const [lastSimulationPayload, setLastSimulationPayload] =
    useState<StoreSimulationRequest | null>(null);
  const [isSaveSheetVisible, setIsSaveSheetVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const calculatePayrollMutation = useCalculatePayroll();
  const createSimulationMutation = useCreateSimulation();

  const { control, handleSubmit, formState, reset } = useForm<
    simulatorScreenSchemaInput,
    unknown,
    simulatorScreenSchemaType
  >({
    resolver: zodResolver(simulatorScreenSchema),
    defaultValues: INITIAL_SIMULATION_FORM,
    mode: "onChange",
  });

  function resetSimulationForm() {
    reset(INITIAL_SIMULATION_FORM);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  function handlePullToReset() {
    resetSimulationForm();
    setResult(null);
    setLastSimulationPayload(null);
    setIsSaveSheetVisible(false);
  }

  async function onSubmit(data: simulatorScreenSchemaType) {
    const calculatePayload = buildCalculatePayrollPayload(data);
    const simulationPayload = buildStoreSimulationPayload(data);

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response =
        await calculatePayrollMutation.mutateAsync(calculatePayload);
      setResult(response);
      setLastSimulationPayload(simulationPayload);
      resetSimulationForm();
    } catch (error) {
      const message = getPayrollErrorMessage(error);
      setErrorMessage(message);
    }
  }

  function handleOpenSaveSheet() {
    if (!lastSimulationPayload) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSaveSheetVisible(true);
  }

  function handleCloseSaveSheet() {
    if (createSimulationMutation.isPending) {
      return;
    }

    setIsSaveSheetVisible(false);
  }

  async function handleSaveSimulation(data: BottomSheetFormData) {
    if (!lastSimulationPayload || createSimulationMutation.isPending) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await createSimulationMutation.mutateAsync({
        ...lastSimulationPayload,
        title: data.title.trim(),
      });
      setLastSimulationPayload(null);
      setIsSaveSheetVisible(false);
      setSuccessMessage("Simulação salva com sucesso.");
    } catch (error) {
      const message = getCreateSimulationErrorMessage(error);
      setErrorMessage(message);
    }
  }

  const benefitsDiscounts = result
    ? result.discounts.transport +
      result.discounts.meal +
      result.discounts.health_plan +
      result.discounts.other
    : undefined;

  return (
    <Screen
      scrollable
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handlePullToReset} />
      }
    >
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

      {result && (
        <NetSalaryCard
          netSalary={result.net_salary}
          inssValue={result.discounts.inss}
          irrfValue={result.discounts.irrf}
          benefitsValue={benefitsDiscounts}
        />
      )}

      {result ? <SimulationResultDetails result={result} /> : null}

      {errorMessage ? (
        <Text className="text-sm color-deduction font-roboto mb-4">
          {errorMessage}
        </Text>
      ) : null}

      {successMessage ? (
        <Text className="text-sm color-primary font-roboto mb-4">
          {successMessage}
        </Text>
      ) : null}

      <Button
        title={
          calculatePayrollMutation.isPending
            ? "Calculando..."
            : "Calcular salário"
        }
        iconName="calculator"
        style={{ marginBottom: 16, marginTop: result ? 0 : 16 }}
        variant={!formState.isValid ? "disabled" : "primary"}
        disabled={!formState.isValid || calculatePayrollMutation.isPending}
        loading={calculatePayrollMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      />

      {result ? (
        <Button
          title={
            createSimulationMutation.isPending
              ? "Salvando..."
              : "Salvar simulação"
          }
          iconName="save-outline"
          variant={!lastSimulationPayload ? "disabled" : "outline"}
          disabled={!lastSimulationPayload || createSimulationMutation.isPending}
          onPress={handleOpenSaveSheet}
        />
      ) : null}

      <BottomSheet
        visible={isSaveSheetVisible}
        loading={createSimulationMutation.isPending}
        onClose={handleCloseSaveSheet}
        onSave={handleSaveSimulation}
      />
    </Screen>
  );
}

function SimulationResultDetails({
  result,
}: {
  result: PayrollCalculationResult;
}) {
  return (
    <View className="bg-white rounded-lg p-4 shadow-sm mb-4 gap-3">
      <Text className="text-lg font-roboto-bold color-secondary">
        Detalhes da simulação
      </Text>

      <View className="gap-2">
        <SimulationDetailRow
          label="Salário bruto"
          value={formatCurrency(result.gross_salary)}
        />
        <SimulationDetailRow
          label="Total de descontos"
          value={formatDeductionCurrency(result.total_discounts)}
        />
        <SimulationDetailRow
          label="Base IRRF"
          value={formatCurrency(result.irrf_base)}
        />
        <SimulationDetailRow
          label="INSS"
          value={formatDeductionCurrency(result.discounts.inss)}
        />
        <SimulationDetailRow
          label="IRRF"
          value={formatDeductionCurrency(result.discounts.irrf)}
        />
        <SimulationDetailRow
          label="Vale transporte"
          value={formatDeductionCurrency(result.discounts.transport)}
        />
        <SimulationDetailRow
          label="Vale refeição"
          value={formatDeductionCurrency(result.discounts.meal)}
        />
        <SimulationDetailRow
          label="Plano de saúde"
          value={formatDeductionCurrency(result.discounts.health_plan)}
        />
        <SimulationDetailRow
          label="Outros descontos"
          value={formatDeductionCurrency(result.discounts.other)}
        />
        <SimulationDetailRow
          label="Alíquota efetiva"
          value={formatPercentage(result.effective_rate)}
        />
        <SimulationDetailRow
          label="Ano de cálculo"
          value={String(result.calculation_year)}
        />
      </View>
    </View>
  );
}

function SimulationDetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <Text className="font-roboto color-subtitle flex-1">{label}</Text>
      <Text className="font-roboto-bold color-secondary text-right">
        {value}
      </Text>
    </View>
  );
}

function formatPercentage(value: number) {
  return `${value.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  })}%`;
}
