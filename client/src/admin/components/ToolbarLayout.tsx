import { Grid, Paper } from "@mui/material";
import type { ReactNode } from "react";

const ToolbarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Paper sx={{ padding: 2, gap: 2, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <Grid container spacing={2} width={"100%"}>
        {children}
      </Grid>
    </Paper>
  );
};

export default ToolbarLayout;
