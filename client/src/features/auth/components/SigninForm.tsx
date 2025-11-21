import { zodResolver } from "@hookform/resolvers/zod";
import type { SigninSchema } from "@millionsclub/shared-libs/client";
import { signinSchema } from "@millionsclub/shared-libs/client";
import { CircularProgress, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import LinkButton from "../../../components/LinkButton";
import Alert from "../../../components/Alert";

type Props = {
  onSubmit: (data: SigninSchema) => void;
  isLoading: boolean;
  isError: boolean;
  error:string
};

const SigninForm = ({ onSubmit, isLoading, isError, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors: validationError },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField {...register("email")} label="Email address" variant="standard" error={!!validationError.email} helperText={validationError.email?.message} fullWidth />

        <TextField {...register("password")} label="Password" type="password" variant="standard" error={!!validationError.password} helperText={validationError.password?.message} fullWidth />

        <LinkButton type="submit" variant="contained">
          {" "}
          Signin
          {isLoading && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
        </LinkButton>

        {isError && <Alert success={false}>{error}</Alert>}
      </Stack>
    </form>
  );
};

export default SigninForm;
