import { Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router"; 
import axiosInstance, { setAccessToken } from "../lib/axios"; 

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {

      const isPersist = localStorage.getItem("persist");

      if (!isPersist){
        setIsLoading(false);
        return
      }


      try {
        const { data } = await axiosInstance.post("/api/users/refresh-token");
        setAccessToken(data.data.accessToken);
      } catch (err) {
        setAccessToken(null);
      } finally {
        setIsLoading(false)
      }
    };
    verifySession();
  }, []);

  if (isLoading) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "95vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton width="100%" height="100px" />

        <Skeleton variant="rounded" width="100%" sx={{ flexGrow: 1 }} />
      </Stack>
    );
  }

  return <Outlet />;
};

export default PersistLogin;
