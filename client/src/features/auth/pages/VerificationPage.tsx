import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AnimatedTick } from "../../../components/animations/AnimatedTickMark";
import { Shake } from "../../../components/animations/Shake";
import CardContainer from "../../../components/CardContainer";
import LinkButton from "../../../components/LinkButton";
import OtpFields from "../components/OtpFields";
import ResendOtp from "../components/ResendOtp";
import useVerifyEmail from "../hooks/useVerifyEmail";

const VerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(() => Array(6).fill(""));
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [error, setError] = useState("");
  
  // 1. Add this state to control the shake
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  if (!email) throw new Response("Email parameter is required", { status: 400 });

  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  useEffect(() => {
    let timer: any;
    if (verifyStatus === true) {
      timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [verifyStatus, navigate]);

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
          
          // 2. Increment the trigger to force the animation
          setShakeTrigger(prev => prev + 1);
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
          <Typography color="gray">We've sent a 6-digit verification code to your email.</Typography>
          <Box color="gray">{email}</Box>
          
          {/* 3. Pass the trigger to the Shake component */}
          <Shake shouldShake={shakeTrigger}>
            <OtpFields otp={otp} setOtp={setOtp} error={error} verifyStatus={verifyStatus} disabled={isPending} sx={{ mt: 2 }} />
            <Typography visibility={error ? "visible" : "hidden"} sx={{ mb: 1, fontSize: "15px", color: "red", fontStyle: "italic" }}>
              {error}
            </Typography>
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