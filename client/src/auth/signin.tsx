import { Card, TextField, Typography, Stack, Button, CircularProgress } from "@mui/material";
import AppLink from "../components/CustomLink";
import { useForm } from "react-hook-form";
import useSigninUser from "./hooks/useSignin";
import { useNavigate } from "react-router";
import useCurrentUser from "./hooks/useCurrentUser";
import { useEffect } from "react";

const Signin = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { mutate: signin, isPending } = useSigninUser();
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true }); // ✅ safe redirect
    }
  }, [currentUser, navigate]);

  const handleSignin = (data: any) => {
    signin(data, {
      onSuccess: () => {
        navigate("/");
      },

      onError: (data) => {
        console.log("signin error ", data);
      },
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "8px" }}
    >
      <Typography fontSize={30} fontWeight="bold" mb={3}>
        Login
      </Typography>

      <form onSubmit={handleSubmit(handleSignin)}>
        <Stack spacing={3}>
          <TextField
            {...register("email", { required: true })}
            label="Email address"
            variant="standard"
            helperText="We'll never share your email."
            fullWidth
          />

          <TextField
            {...register("password", { required: true })}
            label="password"
            variant="standard"
            fullWidth
          />
          <Button
            disabled={isPending}
            type="submit"
            size="large"
            variant="contained"
          >
            Signin
              {isPending && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
          </Button>
          <Stack>
            <Typography>
              Does't have an account?{" "}
              <AppLink
                to={"/signup"}
                sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
              >
                Sign up
              </AppLink>
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default Signin;
