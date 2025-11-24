import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { AnimatedTick } from "../../../components/animations/AnimatedTickMark";
import { Shake } from "../../../components/animations/Shake";
import CardContainer from "../../../components/CardContainer";
import LinkButton from "../../../components/LinkButton";
import OtpFields from "../components/OtpFields";
import ResendOtp from "../components/ResendOtp";
import useVerifyEmail from "../hooks/useVerifyEmail";

const VerificationPage = () => {
  const [otp, setOtp] = useState<string[]>(() => Array(6).fill(""));
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  if (!email) throw new Response("Email parameter is required", { status: 400 });

  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  const handleverifyemail = () => {
    verifyEmail(
      { email, otp: otp.join("") },
      {
        onSuccess: (res) => {
          setVerifyStatus(res.success);
        },
        onError: (error) => {
          setVerifyStatus(false);
          setError(error.response?.data.message || "Could not verify, Try again");
        },
      }
    );
  };

  return (
    <CardContainer heading={verifyStatus ? "Verification Completed" : "Check your email"} icon={<MailOutlineIcon fontSize="large" />}>
      {verifyStatus ? (
        <AnimatedTick />
      ) : (
        <>
          <Typography color="gray">We've sent a 6-digit verification code to your email address.</Typography>
          <Box color="gray">{email}</Box>
          <Shake verifyStatus={verifyStatus}>
            <OtpFields otp={otp} setOtp={setOtp} error={error} verifyStatus={verifyStatus} disabled={isPending} sx={{ mt: 2 }} />
            <Typography visibility={error? 'visible' :'hidden'} sx={{mb:1, fontSize:'15px', color:'red', fontStyle:'italic' }}>{error}</Typography>
          </Shake>
          <LinkButton disabled={isPending} loading={isPending} onClick={() => handleverifyemail()} variant="contained">
            Verify Account
          </LinkButton>
          <ResendOtp email={email} />
        </>
      )}
    </CardContainer>
  );
};

export default VerificationPage;
