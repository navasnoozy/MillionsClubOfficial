import { Card, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  heading: string;
  children: ReactNode;
}

const CardContainer = ({ heading, children }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        width: "fit-content", 
        minWidth: '400px',
        mx: "auto",          
        borderRadius: "8px",
        display: "inline-block", 
        boxShadow:"0 1px 4px rgba(0, 251, 255, 0.75)"
      }}
    >
      <Typography sx={{fontSize:30}}  fontWeight="bold" mb={3}>
        {heading}
      </Typography>
      {children}
    </Card>
  );
};

export default CardContainer;

