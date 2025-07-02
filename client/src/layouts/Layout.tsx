import { Box } from "@mui/material";

import { Outlet, useNavigation } from "react-router";
import { NavBar } from "../components/navbar/Navbar";
import { useIsFetching } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";

const Layout = () => {
  const navigation = useNavigation();
  const isRouteLoading = navigation.state === "loading";
  const isAuthLoading = useIsFetching({ queryKey: ["currentUser"] }) > 0;
  const showPogressBar = isRouteLoading || isAuthLoading;

  return (
    <Box>
      <Box position={'relative'}>
        <NavBar />
        {showPogressBar && (
          <LinearProgress
            sx={{
              height:'2px',
              position: "absolute",
              buttom: 0,
              left: 0,
              right: 0,
              zIndex: 1300,
            }}
          />
        )}
      </Box>


      <Box paddingY={"12px"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
