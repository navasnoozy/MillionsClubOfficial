import { Card, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  heading: string;
  children: ReactNode;
}

const AuthContainer = ({ heading, children }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "8px" }}
    >
      <Typography fontSize={30} fontWeight="bold" mb={3}>
        {heading}
      </Typography>
      {children}
    </Card>
  );
};

export default AuthContainer;
