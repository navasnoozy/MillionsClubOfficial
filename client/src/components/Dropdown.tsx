import { MenuItem, Select, FormControl, FormHelperText } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: DropdownOption[];
  label?: string;
  disabled?: boolean;
  width?: string | number;
  error?: boolean;
  helperText?: string;
};

const Dropdown = ({
  value,
  onChange,
  options,
  label,
  width,
  disabled,
  error,
  helperText,
  ...otherProps
}: DropdownProps) => {
  return (
    <FormControl error={error} sx={{ width: width }}>
      <Select
        sx={{
          borderRadius: 50,
          width: "100%", // Let FormControl control the specific width
          fontSize: "15px",
          border: "1px solid",
          borderColor: error ? "error.main" : "#9b9b9b4a",
          height: 40,
          pr: 0.5,
          "& fieldset": { border: "none" }, // remove default border
          "&.Mui-focused": {
            borderColor: error ? "error.main" : "rgba(186, 97, 42, 1)",
          },
        }}
        value={value}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        inputProps={{ "aria-label": label || "select" }}
        {...otherProps}
      >
        <MenuItem sx={{ fontSize: "15px" }} value="" disabled>
          {label || "Select"}
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "15px" }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText sx={{ ml: 1, fontSize: "12px" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Dropdown;