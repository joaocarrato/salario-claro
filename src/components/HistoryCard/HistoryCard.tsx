import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";

export function HistoryCard() {
  //TODO: Substituir os dados hardcoded por props e adicionar navegação para detalhes da simulação

  return (
    <View className="bg-white rounded-lg p-6 shadow-sm">
      <View className="flex-row items-center">
        <View className="flex-row items-center gap-2">
          <Ionicons name="time" color={"#00685F"} size={28} />
          <Text className="text-lg font-roboto-bold text-primary">
            ULTIMA SIMULAÇÃO
          </Text>
        </View>
        <Text className="text-sm font-roboto color-subtitle ml-auto">
          Hoje, 14:30
        </Text>
      </View>

      <Text className="text-lg font-roboto color-subtitle mt-4">
        Salário líquido estimado
      </Text>

      <Text className="text-4xl font-roboto-bold mt-1">R$ 5.000,00</Text>

      <Divider />

      <Text className="text-lg font-roboto color-subtitle">Salário bruto</Text>
      <Text className="text-2xl font-roboto-bold mt-1 color-secondary">
        R$ 5.000,00
      </Text>

      {/* <Pressable className="self-end flex-row items-center gap-1">
        <Text className="text-primary font-roboto-bold ">Ver detalhes</Text>
        <Ionicons name="arrow-forward" size={18} color={"#00685F"} />
      </Pressable> */}
    </View>
  );
}

function Divider() {
  return <View className="h-0.5 bg-gray-200 my-6" />;
}
