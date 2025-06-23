import { Box } from "@mui/material";

import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
