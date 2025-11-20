import { Alert, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Flip from "../../../components/animations/Flip";
import useResendotp from "../hooks/useResendotp";

const RESEND_TIMEOUT = 60;

const ResendOtp = ({ email }: { email: string | null }) => {
  const { mutate: resendotp } = useResendotp();
  const [status, setStatus] = useState<{ success: boolean; message: string }>({ success: true, message: "" });
  const [resendTimer, setResendTimer] = useState(RESEND_TIMEOUT);
  const intervalRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 0) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
          }
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  if (!email) throw new Response("Email parameter is required", { status: 400 });

  const handleResendOtp = () => {
    resendotp(email, {
      onSuccess: (data) => {
        setStatus(() => ({ success: data.success, message: data.message }));
        setIsRunning(true);
        setResendTimer(60);
      },
      onError: (data) => {
        setStatus(() => ({ success: false, message: data.response?.data.message || "" }));
      },
    });
  };

  const show = resendTimer > 55 && status.message;

  return (
    <>
      {!show ? (
        <Flip key="timer">
          <Stack paddingY={2} direction="row" justifyContent="center" alignItems="center">
            <Typography>Didn't receive the code</Typography>

            <Button disabled={isRunning} onClick={handleResendOtp} sx={{ textTransform: "none" }}>
              {isRunning ? `Resend in 00:${resendTimer}` : "Resend code"}
            </Button>
          </Stack>
        </Flip>
      ) : (
        <Flip key="status">
          <Stack paddingY={3} direction="row" justifyContent="center" alignItems="center">
            <Alert severity={status.success ? 'success' : 'error'}>
             {status.message}
            </Alert>
          </Stack>
        </Flip>
      )}
    </>
  );
};

export default ResendOtp;
