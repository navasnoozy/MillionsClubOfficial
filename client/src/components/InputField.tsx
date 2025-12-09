//src/components/InputField.tsx

import { TextField, type TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = TextFieldProps & {
  name: string;
  label: string;
};

const FormInputField = ({ name, label, ...otherProps }: InputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => <TextField size="small" {...field} {...otherProps} label={label} error={!!error} helperText={error?.message} variant="standard" />}
    />
  );
};

export default FormInputField;
