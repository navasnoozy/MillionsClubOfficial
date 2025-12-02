//client/src/features/auth/pages/GoogleLogin.tsx
import { Button } from "@mui/material";
import { authClient } from "../lib/Oauth-client";
import GoogleGradientIcon from "../../../components/icons/GoogleGradientIcon";

const GoogleLogin = () => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Button size="small" variant="outlined" sx={{ py: 1, my: 1 }} onClick={() => signIn()}>
      <GoogleGradientIcon sx={{ fontSize: "17px", mr: 1 }} />
      Google
    </Button>
  );
};

export default GoogleLogin;
