import { Button } from "@/src/components/Button/Button";
import Card from "@/src/components/Card/Card";
import Screen from "@/src/components/Screen/Screen";
export default function SimulatorScreen() {
  return (
    <Screen scrollable>
      <Card
        title="Informe seu salário bruto mensal"
        textInputProps={{ placeholder: "R$1500" }}
        style={{ marginBottom: 16 }}
      />

      <Card
        title="Informe seu salário bruto mensal"
        cardStyle="smallCard"
        iconName="people"
        textInputProps={{ placeholder: "0" }}
        style={{ marginBottom: 16 }}
      />

      <Card
        title="Vale transporte (%)"
        cardStyle="smallCard"
        iconName="bus"
        textInputProps={{ placeholder: "6%" }}
        style={{ marginBottom: 16 }}
      />

      <Card
        title="Vale Refeição (R$)"
        cardStyle="smallCard"
        iconName="fast-food"
        textInputProps={{ placeholder: "0,00" }}
        style={{ marginBottom: 16 }}
      />

      <Card
        title="Plano de Saúde (R$)"
        cardStyle="smallCard"
        iconName="medkit"
        textInputProps={{ placeholder: "0,00" }}
        style={{ marginBottom: 16 }}
      />

      <Card
        title="Outros Descontos (R$)"
        cardStyle="smallCard"
        iconName="document"
        textInputProps={{ placeholder: "0,00" }}
        style={{ marginBottom: 16 }}
      />

      <Button iconName="calculator" style={{ marginBottom: 16 }} />
    </Screen>
  );
}
