
//client/src/features/auth/pages/GoogleLogin.tsx
import { Button } from "@mui/material";
import { authClient } from "../lib/Oauth-client";

const GoogleLogin = () => {
  const signIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    console.log(`/// data ${JSON.stringify(data)}, /// error ${error}`);
  };

  return <Button onClick={() => signIn()}>Google</Button>;
};

export default GoogleLogin;
