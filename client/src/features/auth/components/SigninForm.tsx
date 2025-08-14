import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SigninSchema } from "@millionsclub/shared-libs/client";
import { signinSchema } from "@millionsclub/shared-libs/client";
import AppLink from "../../../components/CustomLink";
import ErrorMessages from "../../../components/errorMessge";

type Props = {
  onSubmit: (data: SigninSchema) => void;
  isLoading: boolean;
  isError: boolean;
  errors: { message: string; field: string }[];
};

const SigninForm = ({ onSubmit, isLoading, isError, errors }: Props) => {
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
        <TextField
          {...register("email")}
          label="Email address"
          variant="standard"
          error={!!validationError.email}
          helperText={validationError.email?.message}
          fullWidth
        />

        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="standard"
          error={!!validationError.password}
          helperText={validationError.password?.message}
          fullWidth
        />

        <Button
          disabled={isLoading}
          type="submit"
          size="large"
          variant="contained"
        >
          Signin
          {isLoading && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
        </Button>

        <Typography>
          Don’t have an account?{" "}
          <AppLink
            to={"/signup"}
            sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
          >
            Sign up
          </AppLink>
        </Typography>

        {isError && <ErrorMessages errors={errors} />}
      </Stack>
    </form>
  );
};

export default SigninForm;
