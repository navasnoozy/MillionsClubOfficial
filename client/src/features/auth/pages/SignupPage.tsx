import axios from "axios";
import { useState } from "react";
import type { SignupSchema } from "@millionsclub/shared-libs/client";
import useSignupUser from "../hooks/useSignup";
import CardContainer from "../../../components/CardContainer";
import SignupForm from "../components/SignupForm";
import Divider from "../components/Divider";
import GoogleLogin from "./GoogleLogin";
import AuthSwitchLink from "../components/AuthSwitchLink";
import useAppNavigate from "../../../hooks/useAppNavigate";

const SignupPage = () => {
  const [error, setError] = useState<string>("");
  const { goToVerifyPage } = useAppNavigate();

  const { mutate: signup, isPending: signupLoading, isError } = useSignupUser();

  const handleSignup = (data: SignupSchema) => {
    signup(data, {
      onSuccess: (res) => {
        goToVerifyPage(res.data?.email);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const msg = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
          setError(msg);
        }
      },
    });
  };

  return (
    <CardContainer heading={"Create Account"}>
      <SignupForm onSubmit={handleSignup} isLoading={signupLoading} isError={isError} error={error} />
      <AuthSwitchLink mode="signup" />
      <Divider />
      <GoogleLogin />
    </CardContainer>
  );
};

export default SignupPage;
