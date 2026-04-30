import { formatCurrency, formatDeductionCurrency } from "@/src/utils/currency";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { Input, InputProps } from "../Input/Input";

const $compareStyles = {
  primary: {
    container: "bg-gray-300 h-9 w-9 items-center justify-center rounded-2xl",
    text: "text-xl color-gray-500 font-roboto",
    label: "Proposta A",
    proposeType: "A",
  },
  secondary: {
    container:
      "bg-green-200/60 h-9 w-9 items-center justify-center rounded-2xl",
    text: "text-xl color-green-700 font-roboto",
    label: "Proposta B",
    proposeType: "B",
  },
};

interface CompareCardProps {
  type?: "primary" | "secondary";
  inputLabel: string;
  inssValue?: number;
  irrfValue?: number;
  netSalary?: number;
  boxProps?: StyleProp<ViewStyle>;
  disabled?: boolean;
  inputProps?: Omit<InputProps, "label">;
}

export function CompareCard({
  type = "primary",
  inputLabel,
  inssValue,
  irrfValue,
  netSalary,
  boxProps,
  disabled = true,
  inputProps,
}: CompareCardProps) {
  const { container, text } = $compareStyles[type];

  return (
    <View
      className="p-6 border border-surface rounded-md bg-white"
      style={boxProps}
    >
      <View className="flex-row items-center">
        <View className={container}>
          <Text className={text}>{$compareStyles[type].proposeType}</Text>
        </View>
        <Text className="text-2xl font-roboto-bold ml-4">
          {$compareStyles[type].label}
        </Text>
      </View>
      <Divider />

      <Input label={inputLabel} {...inputProps} />

      {!disabled && (
        <>
          <View className="p-4 bg-surface rounded-lg my-6">
            <Text className="font-roboto-medium color-secondary mb-2">
              RESUMO DE DESCONTOS
            </Text>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-roboto color-secondary">INSS (Teto)</Text>
              <Text className="font-roboto-medium color-deduction">
                {formatDeductionCurrency(inssValue)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="font-roboto color-secondary">IRRF Estimado</Text>
              <Text className="font-roboto-medium color-deduction">
                {formatDeductionCurrency(irrfValue)}
              </Text>
            </View>
          </View>

          <Divider />

          <View className="flex-row items-center justify-between">
            <Text className="font-roboto-bold color-secondary">
              Salário Líquido
            </Text>
            <Text
              className={`text-2xl font-roboto-bold ${type === "secondary" ? "color-green-900" : "color-black"}`}
            >
              {formatCurrency(netSalary)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

function Divider() {
  return <View className="h-0.5 bg-gray-200 my-6" />;
}
