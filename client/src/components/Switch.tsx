import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[400],
  },
}));

type TongleButtonProps = {
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  label?: string;
};

const TongleButton = ({ checked, onChange, label }: TongleButtonProps) => {
  return ( 
    <div>
      {label && <span style={{ marginRight: "8px" }}>{label}</span>}
      <GreenSwitch checked={checked} onChange={onChange} color="secondary" />
    </div>
  );
};


export default TongleButton;
