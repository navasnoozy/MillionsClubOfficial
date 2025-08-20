import { Controller, useFormContext } from "react-hook-form";
import Dropdown from "./Dropdown";

type RHFDropdownProps = {
  name: string;
  options: { _id: string; name: string; slug: string }[];
  label?: string;
};

const RHFDropdown = ({ name, options, label }: RHFDropdownProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="" // This ensures we always have a string value
      render={({ field: { value, onChange, ...field } }) => (
        <Dropdown
          {...field}
          value={value || ""} // Convert undefined/null to empty string
          onChange={onChange}
          options={options}
          label={label}
          errorMessage={errors[name]?.message as string}
        />
      )}
    />
  );
};

export default RHFDropdown;
