import { Button } from "@mui/material";
import { authClient } from "../lib/Oauth-client";

const GoogleLogin = () => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return <Button onClick={() => signIn()}>Google</Button>;
};

export default GoogleLogin;
