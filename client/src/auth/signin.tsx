import { Card, TextField, Typography, Stack, Button } from "@mui/material";
import AppLink from "../components/CustomLink";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signin = () => {
  const { register, handleSubmit } = useForm();

  const submit = async (data: any) => {
    try {
      const result = await axios.post("/api/users/signup", data);
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
        Login
      </Typography>

      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={3}>
          <TextField
            {...register('email',{required:true})}
            label="Email address"
            variant="standard"
            helperText="We'll never share your email."
            fullWidth
          />

          <TextField
          {...register('password',{required:true})}
            label="password"
            variant="standard"
            fullWidth
          />
          <Button type="submit" size="large" variant="contained">
            Signin
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
