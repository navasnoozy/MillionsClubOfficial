import { FormControl, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

type DropdownProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: string[];
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
          border: "1px solid rgba(0,0,0,0.12)",
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
        <MenuItem sx={{ fontSize: "15px" }} value="" disabled>
          {label || "Select"}
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt} sx={{ fontSize: "15px" }}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
