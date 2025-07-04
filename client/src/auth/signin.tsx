import {
  Card,
  TextField,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import AppLink from "../components/CustomLink";
import { useForm } from "react-hook-form";
import useSigninUser from "./hooks/useSignin";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { SigninSchema } from "@millionsclub/shared-libs";
import { signinSchema } from "@millionsclub/shared-libs/client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import ErrorMessages from "./components/errorMessge";
import AuthContainer from "./AuthContainer";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

const Signin = () => {
  const navigate = useNavigate();
  const [signinError, setSigninError] = useState<
    { message: string; field: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors: validationError },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });
  const { mutate: signin, isPending, isError } = useSigninUser();

  useAuthRedirect()

  const handleSignin = (data: SigninSchema) => {
    signin(data, {
      onSuccess: () => {
        navigate("/");
      },

      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errors = error.response?.data.error;
          setSigninError(errors);
        }
      },
    });
  };

  return (
    <AuthContainer heading={"Login"}>
      <form onSubmit={handleSubmit(handleSignin)}>
        <Stack spacing={3}>
          <TextField
            {...register("email", { required: true })}
            label="Email address"
            variant="standard"
            error={!!validationError.email}
            helperText={validationError.email?.message}
            fullWidth
          />

          <TextField
            {...register("password", { required: true })}
            label="password"
            type="password"
            variant="standard"
            error={!!validationError.password}
            helperText={validationError.password?.message}
            fullWidth
          />
          <Button
            disabled={isPending}
            type="submit"
            size="large"
            variant="contained"
          >
            Signin
            {isPending && (
              <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />
            )}
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
          {isError && <ErrorMessages errors={signinError} />}
        </Stack>
      </form>
    </AuthContainer>
  );
};

export default Signin;
