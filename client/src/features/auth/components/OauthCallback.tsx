// client/src/features/auth/pages/OauthCallback.tsx
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query"; // Import QueryClient
import { useEffect, useRef } from "react";
import useAppNavigate from "../../../hooks/useAppNavigate";
import { refreshAccessToken } from "../../../lib/axios";

const OauthCallback = () => {
  const { goHome, goToLogin } = useAppNavigate();
  const queryClient = useQueryClient();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const hydrateAuth = async () => {
      try {
        await refreshAccessToken();
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
