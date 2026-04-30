import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useSafeArea() {
  const { top, bottom } = useSafeAreaInsets();

  return {
    top: Math.max(top, 24),
    bottom: Math.max(bottom, 24),
  };
}
