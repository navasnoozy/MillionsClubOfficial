import { Alert as MuiAlter } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  success: boolean;
  children: ReactNode | string;
}

const Alert = ({ success, children }: Props) => {
  return <MuiAlter severity={success ? "success" : "error"}>{children}</MuiAlter>;
};

export default Alert;
