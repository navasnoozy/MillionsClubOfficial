//src/components/InputField.tsx

import { TextField, type TextFieldProps } from "@mui/material";
import type { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = TextFieldProps & {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
};

const FormInputField = ({ name, label, type, ...otherProps }: InputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => <TextField type={type} size="small" {...field} {...otherProps} label={label} error={!!error} helperText={error?.message}  />}
    />
  );
};

export default FormInputField;
