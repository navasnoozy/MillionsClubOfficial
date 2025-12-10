import { Controller, useFormContext } from "react-hook-form";
import Dropdown from "./Dropdown";

type Option = { value: string; label: string };

type FormDropdownProps = {
  name: string;
  options: Option[];
  label?: string;
  disabled?: boolean;
  width?: string | number;
};

const FormDropdown = ({
  name,
  options,
  label,
  disabled,
  width,
}: FormDropdownProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Dropdown
          value={value}
          onChange={onChange}
          options={options}
          label={label}
          disabled={disabled}
          width={width}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default FormDropdown;