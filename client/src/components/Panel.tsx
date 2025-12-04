import { Box } from "@mui/material";
import AppButton from "./AppButton";

const Panel = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <AppButton to="/admin" size="small" variant="contained" color="primary">
        {" "}
        Dashboard
      </AppButton>
      <AppButton to="/admin/addproduct" size="small" variant="contained" color="primary">
        {" "}
        Add Product
      </AppButton>
    </Box>
  );
};

export default Panel;
