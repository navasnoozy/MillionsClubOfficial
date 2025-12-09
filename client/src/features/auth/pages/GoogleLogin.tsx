//client/src/features/auth/pages/GoogleLogin.tsx
import AppButton from "../../../components/AppButton";
import GoogleGradientIcon from "../../../components/icons/GoogleGradientIcon";
import { authClient } from "../lib/Oauth-client";

const GoogleLogin = () => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/oauth/callback",
    });
  };

  return (
    <AppButton size="small" variant="outlined" sx={{ py: 1, my: 1 ,px:2 }} onClick={() => signIn()}>
      <GoogleGradientIcon sx={{ fontSize: "17px", mr: 1 }} />
      Google
    </AppButton>
  );
};

export default GoogleLogin;
