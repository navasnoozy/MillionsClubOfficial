import { Card, TextField, Typography, Stack, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import AppLink from "../components/CustomLink";
import axiosInstance from "../lib/axios";

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const submit = async (data: any) => {
    try {
      const result = await axiosInstance.post("/api/users/signup", data);
      console.log(result);
    } catch (error) {
      console.log("an error occured", error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "8px" }}
    >
      <Typography fontSize={30} fontWeight="bold" mb={3}>
        Create account
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
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
          <Button type="submit" size="large" variant="contained">
            Signup
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
