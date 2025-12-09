//src/components/FormDropdown.tsx
import { Controller, useFormContext } from "react-hook-form";
import Dropdown from "./Dropdown";

type Option = { value: string; label: string };

type FormDropdownProps = {
  name: string;
  options: Option[];
  label?: string;
  disabled?: boolean;
};

const FormDropdown = ({ name, options, label, disabled }: FormDropdownProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange } }) => <Dropdown value={value} onChange={onChange} options={options} label={label} disabled={disabled} />}
    />
  );
};

export default FormDropdown;
