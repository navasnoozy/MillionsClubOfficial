import { FormControl, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

type Option = { _id: string; name: string };

type DropdownProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
  label?: string;
  disabled?: boolean;
};

const Dropdown = ({ value, onChange, options, label, disabled }: DropdownProps) => {
  return (
    <FormControl sx={{ width: 300 }} size="small">
      <Select
        sx={{
          border: "1px solid rgba(0,0,0,0.12)", // subtle border
          height: 40,
          pl: 1.2,
          "& fieldset": { border: "none" }, // remove default outline
          "&.Mui-focused": {
            border: "1px solid rgba(0,0,0,0.2)", // slightly darker on focus
          },
        }}
        value={value}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        inputProps={{ "aria-label": label || "select" }}
      >
        <MenuItem value="" disabled>
          {label || "Select"}
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt._id} value={opt._id}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
