import { Card, TextField, Typography, Stack, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import AppLink from "../components/CustomLink";
import useSignupUser from "./hooks/useSignup";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useCurrentUser from "./hooks/useCurrentUser";

const Signup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { mutate: signup, isPending:signupLoading, isError, error } = useSignupUser();
  const {data: currentUser, isPending: currentUserLoading} = useCurrentUser();

    useEffect(() => {
      if (currentUser) {
        navigate("/", { replace: true }); // ✅ safe redirect
      }
    }, [currentUser, navigate]);

  const handleSignup = (data: any) => {
    signup(data, {
      onSuccess: () => {
        navigate("/");
      },

      onError: (data) => {
        console.log("signup error ", data);
      },
    });
  };

  return (
    <Card
      variant="outlined"
      sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "8px" }}
    >
      <Typography fontSize={30} fontWeight="bold" mb={3}>
        Create account
      </Typography>
      <form onSubmit={handleSubmit(handleSignup)}>
        <Stack spacing={3}>
          <TextField
            {...register("name", { required: true })}
            label="Name"
            variant="standard"
            fullWidth
          />

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
          <TextField
            {...register("confirmPassword", { required: true })}
            label="Confirm password"
            variant="standard"
            fullWidth
          />
          <Button
            disabled={signupLoading}
            type="submit"
            size="large"
            variant="contained"
          >
            Signup
            {signupLoading && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
          </Button>
          <Typography>
            Already have an account?{" "}
            <AppLink
              to={"/signin"}
              sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
            >
              Sign in
            </AppLink>
          </Typography>
        </Stack>
      </form>
    </Card>
  );
};

export default Signup;
