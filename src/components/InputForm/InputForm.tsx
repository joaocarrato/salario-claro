import React from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Input, InputProps } from "../Input/Input";

export function InputForm<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: InputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Input
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          errorMessage={fieldState?.error?.message}
          {...props}
        />
      )}
    />
  );
}
