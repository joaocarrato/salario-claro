import { Stack } from "expo-router";

export default function SimulationStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="simulation-details" />
    </Stack>
  );
}
