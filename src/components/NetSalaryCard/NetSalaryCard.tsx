import WalletIcon from "@/src/assets/Icon/WalletIcon";
import React from "react";
import { Text, View } from "react-native";

export function NetSalaryCard() {
  return (
    <View className="p-4 bg-surface rounded-2xl border border-container items-center my-6">
      <View className="flex-row gap-x-4">
        <View>
          <Text className="text-lg font-roboto-bold color-secondary mb-2">
            SALÁRIO LÍQUIDO ESTIMADO
          </Text>
          <Text className="text-4xl font-roboto-bold color-primary">
            R$ 1.200,00
          </Text>
        </View>

        <WalletIcon />
      </View>

      <Text className="text-sm color-subtitle font-roboto mt-3 m-auto text-center">
        O valor do salário líquido é uma estimativa e pode variar de acordo com
        as deduções e benefícios informados.
      </Text>

      <View className="w-full h-px bg-container mt-4 mb-3" />

      <View className="gap-x-2 flex-row ">
        <View className="items-center">
          <Text className="text-md font-roboto-bold color-subtitle">INSS</Text>
          <Text className="text-lg font-roboto-bold color-deduction text-center">
            - R$ {`\n`}518,82
          </Text>
        </View>
      </View>
    </View>
  );
}
