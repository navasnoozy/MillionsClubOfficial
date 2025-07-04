import {
  Card,
  TextField,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AppLink from "../components/CustomLink";
import useSignupUser from "./hooks/useSignup";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { SignupSchema } from "@millionsclub/shared-libs";
import { signupSchema } from "@millionsclub/shared-libs/client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import ErrorMessages from "./components/errorMessge";
import AuthContainer from "./AuthContainer";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

const Signup = () => {
  const [signupError, setSignupError] = useState<
    { message: string; field: string }[]
  >([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: validationError },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate: signup, isPending: signupLoading, isError } = useSignupUser();

  useAuthRedirect();

  const handleSignup = (data: SignupSchema) => {
    signup(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errors = error.response?.data.error;
          setSignupError(errors);
        }
      },
    });
  };

  return (
    <AuthContainer heading={"Create Account"}>
      <form onSubmit={handleSubmit(handleSignup)}>
        <Stack spacing={3}>
          <TextField
            {...register("name", { required: false })}
            label="Name"
            variant="standard"
            error={!!validationError.name}
            helperText={validationError.name?.message}
            fullWidth
          />

          <TextField
            {...register("email", { required: false })}
            label="Email address"
            variant="standard"
            error={!!validationError.email}
            helperText={
              validationError.email?.message || "We'll never share your email."
            }
            fullWidth
          />

          <TextField
            {...register("password", { required: false })}
            label="password"
            type="password"
            variant="standard"
            error={!!validationError.password}
            helperText={validationError.password?.message}
            fullWidth
          />
          <TextField
            {...register("confirmPassword", { required: false })}
            label="Confirm password"
            type="password"
            variant="standard"
            error={!!validationError.confirmPassword}
            helperText={validationError.confirmPassword?.message}
            fullWidth
          />
          <Button
            disabled={signupLoading}
            type="submit"
            size="large"
            variant="contained"
          >
            Signup
            {signupLoading && (
              <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />
            )}
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
          {isError && <ErrorMessages errors={signupError} />}
        </Stack>
      </form>
    </AuthContainer>
  );
};

export default Signup;
