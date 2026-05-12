import { formatCurrency, formatDeductionCurrency } from "@/src/utils/currency";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";

export type ProposeCardTag = "clt" | "proposal" | "saved";

export type ProposeCardProps = {
  title: string;
  tag: ProposeCardTag;
  dateLabel: string;
  grossSalary: number;
  netSalary: number;
  totalDiscounts: number;
  discountsDescription: string;
};

const tagLabels: Record<ProposeCardTag, string> = {
  clt: "CLT",
  proposal: "Proposta",
  saved: "Salva",
};

const tagStyles: Record<ProposeCardTag, string> = {
  clt: "bg-green-700/10 border-green-700/40",
  proposal: "bg-container/40 border-container",
  saved: "bg-primary/10 border-primary/40",
};

export function ProposeCard({
  title,
  tag,
  dateLabel,
  grossSalary,
  netSalary,
  totalDiscounts,
  discountsDescription,
}: ProposeCardProps) {
  const discountsSuffix = discountsDescription.trim()
    ? ` (${discountsDescription})`
    : "";

  return (
    <View className="bg-white rounded-lg p-6 shadow-sm mt-4 gap-4">
      <View className="flex-row items-start gap-3">
        <Text className="font-roboto-bold text-xl flex-1">{title}</Text>
        <ProposalTag tag={tag} />
      </View>

      <View className="flex-row items-center">
        <Ionicons name="calendar-outline" color={"#535353"} size={18} />
        <Text className="text-base ml-1">{dateLabel}</Text>
      </View>

      <View className="flex-row items-center gap-3">
        <SalaryValueCard label="Bruto" value={formatCurrency(grossSalary)} />
        <SalaryValueCard
          label="Líquido"
          value={formatCurrency(netSalary)}
          highlight
        />
      </View>

      <View className="flex-row items-start">
        <Ionicons name="trending-down-outline" color={"#BA1A1A"} size={20} />
        <Text className="text-base ml-2 font-roboto flex-1">
          {formatDeductionCurrency(totalDiscounts)} em descontos
          {discountsSuffix}
        </Text>
      </View>
    </View>
  );
}

function ProposalTag({ tag }: { tag: ProposeCardTag }) {
  return (
    <View className={`rounded-full px-3 py-1 border ${tagStyles[tag]}`}>
      <Text className="font-roboto text-sm">{tagLabels[tag]}</Text>
    </View>
  );
}

type SalaryValueCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function SalaryValueCard({ label, value, highlight }: SalaryValueCardProps) {
  const containerClassName = highlight
    ? "border rounded-lg bg-green-700/10 p-2 px-3 border-green-700/40 flex-1"
    : "border rounded-lg bg-background p-2 px-3 border-stroke flex-1";
  const labelClassName = highlight
    ? "text-base font-roboto-medium text-primary"
    : "text-base font-roboto";
  const valueClassName = highlight
    ? "text-lg font-roboto-bold text-primary"
    : "text-lg font-roboto-medium";

  return (
    <View className={containerClassName}>
      <Text className={labelClassName}>{label}</Text>
      <Text className={valueClassName} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
}
