import { useState, type MouseEvent } from "react";
import { TextField, type TextFieldProps, InputAdornment, IconButton } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Omit 'type' because we control it internally
type PasswordInputProps = Omit<TextFieldProps, "type"> & {
  name: string;
  label: string;
};

const FormPasswordField = ({ name, label, ...otherProps }: PasswordInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...otherProps}
          size="small"
          label={label}
          type={showPassword ? "text" : "password"}
          error={!!error}
          helperText={error?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label={showPassword ? "hide password" : "show password"} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="small">
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default FormPasswordField;
