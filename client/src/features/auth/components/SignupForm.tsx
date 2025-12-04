import { zodResolver } from "@hookform/resolvers/zod";
import type { SignupSchema } from "@millionsclub/shared-libs/client";
import { signupSchema } from "@millionsclub/shared-libs/client";
import { CircularProgress, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Alert from "../../../components/Alert";
import AppButton from "../../../components/AppButton";

type Props = {
  onSubmit: (data: SignupSchema) => void;
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const SignupForm = ({ onSubmit, isLoading, isError, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors: validationError },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField {...register("name")} label="Name" variant="standard" error={!!validationError.name} helperText={validationError.name?.message} fullWidth />

        <TextField
          {...register("email")}
          label="Email address"
          variant="standard"
          error={!!validationError.email}
          helperText={validationError.email?.message || "We'll never share your email."}
          fullWidth
        />

        <TextField {...register("password")} label="Password" type="password" variant="standard" error={!!validationError.password} helperText={validationError.password?.message} fullWidth />

        <TextField
          {...register("confirmPassword")}
          label="Confirm password"
          type="password"
          variant="standard"
          error={!!validationError.confirmPassword}
          helperText={validationError.confirmPassword?.message}
          fullWidth
        />

        <AppButton type="submit" variant="contained">
          {" "}
          Signup
          {isLoading && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
        </AppButton>

        {isError && <Alert success={false}>{error}</Alert>}
      </Stack>
    </form>
  );
};

export default SignupForm;
