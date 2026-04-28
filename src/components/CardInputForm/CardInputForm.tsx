import React from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import Card, { CardProps } from "../Card/Card";

export function CardInputForm<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: CardProps & UseControllerProps<FormType>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Card
          textInputProps={{ value: field.value, onChangeText: field.onChange }}
          {...props}
        />
      )}
    />
  );
}
