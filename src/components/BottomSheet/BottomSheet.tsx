import { Button } from "@/src/components/Button/Button";
import { InputForm } from "@/src/components/InputForm/InputForm";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export type BottomSheetTag = "clt" | "proposal" | "saved";

export type BottomSheetFormData = {
  title: string;
  tag: BottomSheetTag;
};

type BottomSheetProps = {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onSave: (data: BottomSheetFormData) => void;
};

const INITIAL_FORM_VALUES: BottomSheetFormData = {
  title: "",
  tag: "proposal",
};

const TAG_OPTIONS: Array<{ label: string; value: BottomSheetTag }> = [
  { label: "CLT", value: "clt" },
  { label: "Proposta", value: "proposal" },
  { label: "Salva", value: "saved" },
];

export function BottomSheet({
  visible,
  loading,
  onClose,
  onSave,
}: BottomSheetProps) {
  const [isMounted, setIsMounted] = useState(visible);
  const { height } = useWindowDimensions();
  const translateY = useSharedValue(height);
  const backdropOpacity = useSharedValue(0);

  const { control, handleSubmit, reset, formState } =
    useForm<BottomSheetFormData>({
      defaultValues: INITIAL_FORM_VALUES,
      mode: "onChange",
    });

  useEffect(() => {
    if (visible) {
      reset(INITIAL_FORM_VALUES);
      setIsMounted(true);
      translateY.value = height;
      backdropOpacity.value = 0;
      translateY.value = withTiming(0, animationConfig);
      backdropOpacity.value = withTiming(1, animationConfig);
      return;
    }

    translateY.value = withTiming(height, animationConfig, (finished) => {
      if (finished) {
        scheduleOnRN(setIsMounted, false);
      }
    });
    backdropOpacity.value = withTiming(0, animationConfig);
  }, [backdropOpacity, height, reset, translateY, visible]);

  function handleClose() {
    reset(INITIAL_FORM_VALUES);
    onClose();
  }

  function handleSave(data: BottomSheetFormData) {
    onSave(data);
  }

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!isMounted) {
    return null;
  }

  return (
    <Modal transparent visible={isMounted} animationType="none">
      <View className="flex-1 justify-end">
        <Animated.View
          className="absolute inset-0 bg-black/35"
          style={backdropStyle}
        >
          <Pressable className="flex-1" onPress={handleClose} />
        </Animated.View>

        <Animated.View
          className="bg-background rounded-t-2xl shadow-sm overflow-hidden"
          style={[
            { maxHeight: height * 0.72, minHeight: height * 0.4 },
            sheetStyle,
          ]}
        >
          <KeyboardAwareScrollView
            className="px-5 pt-3"
            contentContainerStyle={{ paddingBottom: 24 }}
            bottomOffset={24}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center mb-4">
              <View className="h-1.5 w-12 rounded-full bg-container" />
            </View>

            <View className="flex-row items-start mb-5">
              <View className="flex-1 pr-3">
                <Text className="text-2xl font-roboto-bold color-secondary">
                  Salvar simulação
                </Text>
                <Text className="font-roboto color-subtitle mt-1">
                  Dê um nome para encontrar depois no histórico.
                </Text>
              </View>

              <Pressable className="p-2" onPress={handleClose}>
                <Ionicons name="close" size={22} color={"#3D4947"} />
              </Pressable>
            </View>

            <InputForm
              control={control}
              name="title"
              label="Título"
              placeholder="Proposta Empresa X"
              prefix={null}
              returnKeyType="done"
              rules={{
                required: "Informe um título para salvar.",
                validate: (value) =>
                  value.trim().length > 0 || "Informe um título para salvar.",
              }}
            />

            <Text className="color-subtitle font-roboto-medium mt-5 mb-2">
              Tag
            </Text>
            <Controller
              control={control}
              name="tag"
              render={({ field }) => (
                <View className="flex-row gap-2">
                  {TAG_OPTIONS.map((tag) => (
                    <TagButton
                      key={tag.value}
                      label={tag.label}
                      selected={field.value === tag.value}
                      onPress={() => field.onChange(tag.value)}
                    />
                  ))}
                </View>
              )}
            />

            <View className="flex-row gap-3 mt-6">
              <View className="flex-1">
                <Button
                  title="Cancelar"
                  variant="outline"
                  onPress={handleClose}
                />
              </View>
              <View className="flex-1">
                <Button
                  title={loading ? "Salvando..." : "Salvar"}
                  iconName="save-outline"
                  loading={loading}
                  disabled={!formState.isValid || loading}
                  variant={!formState.isValid ? "disabled" : "primary"}
                  onPress={handleSubmit(handleSave)}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

function TagButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const className = selected
    ? "flex-1 rounded-full border border-primary bg-primary/10 py-3 items-center"
    : "flex-1 rounded-full border border-stroke bg-white py-3 items-center";
  const textClassName = selected
    ? "font-roboto-bold color-primary"
    : "font-roboto color-secondary";

  return (
    <Pressable className={className} onPress={onPress}>
      <Text className={textClassName}>{label}</Text>
    </Pressable>
  );
}

const animationConfig = {
  duration: 220,
  easing: Easing.out(Easing.cubic),
};
