//src/components/Dropdown.tsx

import { FormControl, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: DropdownOption[]
  label?: string;
  disabled?: boolean;
  width: string;
};

const Dropdown = ({ value, onChange, options, label, width, disabled }: DropdownProps) => {
  return (
    <FormControl size="small">
      <Select
      
        sx={{
          width: width,
          fontSize: "15px",
          border: "1px solid rgba(155, 155, 155, 0.29)",
          height: 40,
          pr: 0.5,
          "& fieldset": { border: "none" }, // remove default border
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
        {/* Helper to allow clearing selection or showing label if needed */}
        <MenuItem sx={{ fontSize: "15px" }} value="" disabled>
          {label || "Select"}
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "15px" }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
