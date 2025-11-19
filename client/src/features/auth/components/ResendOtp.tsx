import { Button, Stack, Typography } from "@mui/material";
import useResendotp from "../hooks/useResendotp";
import { useState } from "react";

const ResendOtp = ({ email }: { email: string | null }) => {
  const { mutate: resendotp, data } = useResendotp();
  const [_status, setStatus] = useState();

  if (!email) throw new Response("Email parameter is required", { status: 400 });

  const handleResendOtp = () => {
    resendotp(email, {
      onSuccess: () => {
        console.log(JSON.stringify(data));
        setStatus(data);
      },
      onError: () => {
        console.log(JSON.stringify(data));
        setStatus(data);
      },
    });
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Typography>Didn't receive the code</Typography>
      <Button onClick={() => handleResendOtp()} sx={{ textTransform: "none" }}>
        Resend code
      </Button>
    </Stack>
  );
};

export default ResendOtp;
