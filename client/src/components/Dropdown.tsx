import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

type DropdownProps = {
  value: string | undefined; // Accept undefined
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { _id: string; name: string; slug: string }[];
  label?: string;
  errorMessage?: string;
};

const Dropdown = ({ value, onChange, options, label, errorMessage }: DropdownProps) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }} error={!!errorMessage}>
      <Select
        value={value || ""} 
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": label || "select" }}
        size="small"
      >
        <MenuItem value="" disabled>
          {label || "Select an option"}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && (
        <p style={{ color: "#d32f2f", fontSize: "0.75rem", marginTop: "3px" }}>
          {errorMessage}
        </p>
      )}
    </FormControl>
  );
};

export default Dropdown;
