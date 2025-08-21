import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

type Option = { _id: string; name: string };

type DropdownProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
};

const Dropdown = ({ value, onChange, options, label, errorMessage, disabled }: DropdownProps) => {
  return (
    <FormControl sx={{ width: 300 }} size="small" error={!!errorMessage}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        inputProps={{ 'aria-label': label || 'select' }}
      >
        <MenuItem value="" disabled>
          {label || 'Select'}
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt._id} value={opt._id}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;
