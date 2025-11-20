import { Alert, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Flip from "../../../components/animations/Flip";
import useResendotp from "../hooks/useResendotp";
import Timer from "../../../components/Timer";

const RESEND_TIMEOUT = 60;

const ResendOtp = ({ email }: { email: string | null }) => {
  const { mutate: resendotp, isPending } = useResendotp();

  const [status, setStatus] = useState({ success: true, message: "" });
  const [time, setTime] = useState(RESEND_TIMEOUT);
  const [running, setRunning] = useState(true);

  if (!email) throw new Response("Email parameter is required", { status: 400 });

  const handleResendOtp = () => {
    resendotp(email, {
      onSuccess: (res) => {
        setStatus({ success: res.success, message: res.message });
        setTime(RESEND_TIMEOUT);
        setRunning(true);
      },
      onError: (err) => {
        setStatus({ success: false, message: err.response?.data.message || "" });
      },
    });
  };

  const show = time > 55 && status.message;

  return (
    <>
      <Timer time={time} running={running} onTick={() => setTime((t) => t - 1)} onFinish={() => setRunning(false)} />

      {!show ? (
        <Flip key="timer">
          <Stack paddingY={2} direction={{xs:'column', sm:'row'}} justifyContent="center" alignItems="center">
            <Typography>Didn't receive the code</Typography>

            <Button disabled={running} loading={isPending} onClick={handleResendOtp} sx={{ textTransform: "none" }}>
              {running ? `Resend in 00:${time}` : "Resend code"}
            </Button>
          </Stack>
        </Flip>
      ) : (
        <Flip key="status">
          <Stack paddingY={3} direction="row" justifyContent="center" alignItems="center">
            <Alert severity={status.success ? "success" : "error"}>{status.message}</Alert>
          </Stack>
        </Flip>
      )}
    </>
  );
};

export default ResendOtp;
