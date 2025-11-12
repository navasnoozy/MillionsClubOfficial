import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignupSchema } from "@millionsclub/shared-libs/client";
import { signupSchema } from "@millionsclub/shared-libs/client";
import AppLink from "../../../components/CustomLink";
import ErrorMessages from "../../../components/errorMessge";

type Props = {
  onSubmit: (data: SignupSchema) => void;
  isLoading: boolean;
  error:string
};

const SignupForm = ({ onSubmit, isLoading,error }: Props) => {
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
        <TextField
          {...register("name")}
          label="Name"
          variant="standard"
          error={!!validationError.name}
          helperText={validationError.name?.message}
          fullWidth
        />

        <TextField
          {...register("email")}
          label="Email address"
          variant="standard"
          error={!!validationError.email}
          helperText={
            validationError.email?.message || "We'll never share your email."
          }
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

        <TextField
          {...register("confirmPassword")}
          label="Confirm password"
          type="password"
          variant="standard"
          error={!!validationError.confirmPassword}
          helperText={validationError.confirmPassword?.message}
          fullWidth
        />

        <Button
          disabled={isLoading}
          type="submit"
          size="large"
          variant="contained"
        >
          Signup
          {isLoading && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
        </Button>

        <Typography sx={{textWrap:'nowrap', display:"flex", justifyContent:'center', gap:1}}>
          Already have an account?{" "}
          <AppLink
            to={"/signin"}
            sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
          >
            Sign in
          </AppLink>
        </Typography>

        {error && <ErrorMessages error={error} />}
      </Stack>
    </form>
  );
};

export default SignupForm;
