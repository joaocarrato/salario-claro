import WalletIcon from "@/src/assets/Icon/WalletIcon";
import React from "react";
import { Text, View } from "react-native";

type NetSalaryCardProps = {
  netSalary?: number;
  inssValue?: number;
  irrfValue?: number;
  benefitsValue?: number;
};

export function NetSalaryCard({
  netSalary,
  inssValue,
  irrfValue,
  benefitsValue,
}: NetSalaryCardProps) {
  return (
    <View className="p-4 bg-surface rounded-2xl border border-container items-center my-6">
      <View className="flex-row gap-x-4">
        <View>
          <Text className="text-lg font-roboto-bold color-secondary mb-2">
            SALÁRIO LÍQUIDO ESTIMADO
          </Text>
          <Text className="text-4xl font-roboto-bold color-primary">
            R${" "}
            {netSalary?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <WalletIcon />
      </View>

      <Text className="text-sm color-subtitle font-roboto mt-3 m-auto text-center">
        O valor do salário líquido é uma estimativa e pode variar de acordo com
        as deduções e benefícios informados.
      </Text>

      <View className="w-full h-px bg-container mt-4 mb-3" />

      <View className="gap-x-2 flex-row justify-evenly w-full">
        <FormatCurrency value={inssValue} label="INSS" />
        <VerticalDivider />
        <FormatCurrency value={irrfValue} label="IRRF" />
        <VerticalDivider />
        <FormatCurrency value={benefitsValue} label="Benefícios" />
      </View>
    </View>
  );
}

type formatCurrencyProps = {
  value?: number;
  label: string;
};

function FormatCurrency({ value, label }: formatCurrencyProps) {
  return (
    <View className="items-center">
      <Text className="text-md font-roboto-bold color-subtitle">{label}</Text>
      <Text className="text-lg font-roboto-bold color-deduction text-center">
        - R$ {`\n`}
        {value}
      </Text>
    </View>
  );
}

function VerticalDivider() {
  return <View className="w-px h-full bg-container" />;
}
