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

const label = { inputProps: { "aria-label": "Color switch demo" } };

const TongleButton = () => {
  return (
    <div>
      <GreenSwitch {...label} defaultChecked color="secondary" />
    </div>
  );
};

export default TongleButton;
