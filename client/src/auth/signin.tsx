import { Card, TextField, Typography, Stack, Button } from "@mui/material";

const Signin = () => (
  <Card
    variant="outlined"
    sx={{ p: 4, maxWidth: 400, mx: "auto", borderRadius: "8px" }}
  >
    <Typography fontSize={30} fontWeight="bold" mb={3}>
      Login
    </Typography>

    <Stack spacing={3}>
      <TextField
        id="email"
        label="Email address"
        variant="standard"
        helperText="We'll never share your email."
        fullWidth
      />

      <TextField id="password" label="password" variant="standard" fullWidth />
      <Button size="large" variant="contained">
        Signin
      </Button>
      <Stack>
        <Typography>Don't have an account </Typography>
      </Stack>
    </Stack>
  </Card>
);

export default Signin;
