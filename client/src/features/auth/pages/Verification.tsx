import { Box, Typography } from "@mui/material";
import CardContainer from "../../../components/CardContainer";
import { useSearchParams } from "react-router";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import OtpInputGroup from "../components/OtpInputGroup";

const Verification = () => {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

//   if (!email) throw new Response("Email parameter is required", { status: 400 });

  return (
    <CardContainer heading="Check your email" icon={<MailOutlineIcon fontSize="large" />}>
     <Typography color="gray">We've sent a 6-digit verification code to your email address.</Typography>
      <Box color='gray'>{email}</Box>
      <OtpInputGroup sx={{my:2}} />
    </CardContainer>
  );
};

export default Verification;
