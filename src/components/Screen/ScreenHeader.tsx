import { Image, Text, View } from "react-native";

export default function ScreenHeader() {
  return (
    <View className="py-2.5 flex-row items-center gap-x-2 border-b px-5 border-gray-200 mb-6 shadow-sm bg-white">
      <View className="h-12 w-12 bg-green-950/40 rounded-full">
        <Image
          source={require("../../assets/Icon/ProfileIcon.png")}
          className="h-full w-full rounded-full"
        />
      </View>

      <View>
        <Text className="font-roboto-bold text-xl color-primary">
          Salário Claro
        </Text>
        <Text className="font-roboto text-md color-subtitle -mt-0.5">
          Entenda seu salário líquido
        </Text>
      </View>

      <View className="h-8 w-10 bg-primary rounded-full items-center justify-center ml-auto">
        <Text className="text-sm font-robot color-white">CLT</Text>
      </View>
    </View>
  );
}
