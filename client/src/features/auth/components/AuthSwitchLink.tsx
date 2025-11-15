import { Typography } from "@mui/material";
import AppLink from "../../../components/CustomLink";


type AuthSwitcherProps = {
  mode: "signin" | "signup";
};

const AuthSwitchLink = ({ mode }: AuthSwitcherProps) => {
  const isSignIn = mode === "signin";

  return (
    <Typography
      sx={{
        my:2,
        textWrap: "nowrap",
        display: "flex",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {isSignIn ? "Don’t have an account?" : "Already have an account?"}

      <AppLink
        to={isSignIn ? "/signup" : "/signin"}
        sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
      >
        {isSignIn ? "Sign up" : "Sign in"}
      </AppLink>
    </Typography>
  );
};

export default AuthSwitchLink;
