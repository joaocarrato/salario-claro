import { ScrollViewProps, View } from "react-native";
import { ScrollViewContainer, ViewContainer } from "./ScreenContainer";
import ScreenHeader from "./ScreenHeader";

type ScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  refreshControl?: ScrollViewProps["refreshControl"];
};

export default function Screen({
  children,
  scrollable,
  refreshControl,
}: ScreenProps) {
  const Container = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <View className="flex-1 pt-safe bg-background">
      <ScreenHeader />
      <Container refreshControl={refreshControl}>{children}</Container>
    </View>
  );
}
