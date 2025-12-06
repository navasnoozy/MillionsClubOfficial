import { Controller, useFormContext } from 'react-hook-form';
import Dropdown from './Dropdown';

type Option = { _id: string; name: string };

type RHFDropdownProps = {
  name: string;
  options: Option[];
  label?: string;
  disabled?: boolean;
};

const RHFDropdown = ({ name, options, label, disabled }: RHFDropdownProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange } }) => (
        <Dropdown
          value={value}
          onChange={onChange}
          options={options}
          label={label}
          disabled={disabled}
          // errorMessage={errors[name]?.message as string}
        />
      )}
    />
  );
};

export default RHFDropdown;
