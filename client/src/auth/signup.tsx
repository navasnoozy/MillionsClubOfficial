import { Card, TextField, Typography, Stack, Button } from "@mui/material";

const Signup = () => (
  <Card
    variant="outlined"
    sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "8px" }}
  >
    <Typography fontSize={30} fontWeight="bold" mb={3}>
      Create account
    </Typography>

    <Stack spacing={3}>
      <TextField id="name" label="Name" variant="standard" fullWidth />

      <TextField
        id="email"
        label="Email address"
        variant="standard"
        helperText="We'll never share your email."
        fullWidth
      />

      <TextField id="password" label="password" variant="standard" fullWidth />
       <TextField id="confirmpassword" label="Confirm password" variant="standard" fullWidth />
       <Button size="large" variant="contained">Signup</Button>
    </Stack>
  </Card>
);

export default Signup;
