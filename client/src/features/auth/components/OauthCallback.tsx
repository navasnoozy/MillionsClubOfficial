// client/src/features/auth/pages/OauthCallback.tsx
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query"; // Import QueryClient
import axiosInstance, { setAccessToken } from "../../../lib/axios";
import { CircularProgress, Box, Typography } from "@mui/material";
import useAppNavigate from "../../../hooks/useAppNavigate";

const OauthCallback = () => {
  const { goHome, goToLogin } = useAppNavigate();
  const queryClient = useQueryClient();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const hydrateAuth = async () => {
      try {
        const response = await axiosInstance.post("/api/users/refresh-token");

        const { accessToken } = response.data.data;

        setAccessToken(accessToken);

        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

        goHome();
      } catch (err) {
        console.error("Google Auth Hydration failed:", err);
        goToLogin();
      }
    };

    hydrateAuth();
  }, [goHome, goToLogin, queryClient]); 

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Finalizing Login...</Typography>
    </Box>
  );
};

export default OauthCallback;
