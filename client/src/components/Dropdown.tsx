
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormContext, Controller } from "react-hook-form";

type DropdownProps = {
  fieldname: string;
  options: { _id: string; name: string, slug: string }[]; 
  label?: string;
};

const Dropdown = ({ fieldname : name, options, label }: DropdownProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl sx={{ m: 1, width: 300,  }} error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} displayEmpty inputProps={{ "aria-label": label || "select" }}>
            <MenuItem value="" disabled>
              {label || "Select an option"}
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && (
        <p style={{ color: "#d32f2f", fontSize: "0.75rem", marginTop: "3px" }}>
          {errors[name]?.message as string}
        </p>
      )}
    </FormControl>
  );
};

export default Dropdown;
