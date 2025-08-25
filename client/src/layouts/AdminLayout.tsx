import { Box, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useIsFetching } from "@tanstack/react-query";
import { Outlet, useNavigation } from "react-router";
import AppDrawer from "../components/admin/Sidebar";




const AdminLayout = () => {
  const navigation = useNavigation();
  const isRouteLoading = navigation.state === "loading";
  const isAuthLoading = useIsFetching({ queryKey: ["currentUser"] }) > 0;
  const showPogressBar = isRouteLoading || isAuthLoading;

  return (
    <Box>
      <AppDrawer />
      {showPogressBar && (
        <LinearProgress
          sx={{
            height: "2px",
            position: "fixed",
            top: 64, 
            left: 0,
            right: 0,
            zIndex: 1300,
          }}
        />
      )}

        <Box className='......navas.......' justifyContent={'center'} paddingY={"12px"} paddingTop={'80px'}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
