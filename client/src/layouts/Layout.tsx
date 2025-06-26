import { Box } from "@mui/material";

import { Outlet } from "react-router";
import { NavBar } from "../components/navbar/Navbar";

const Layout = () => {
  return (
    <Box>
      <NavBar />
      <Box paddingY={'12px'}>
      <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
