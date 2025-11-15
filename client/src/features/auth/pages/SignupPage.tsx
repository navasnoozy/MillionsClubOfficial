import { useNavigate } from "react-router";

import axios from "axios";
import { useState } from "react";

import type { SignupSchema } from "@millionsclub/shared-libs/client";
import useSignupUser from "../hooks/useSignup";
import CardContainer from "../../../components/CardContainer";
import SignupForm from "../components/SignupForm";
import Divider from "../components/Divider";
import GoogleLogin from "./GoogleLogin";
import AuthSwitchLink from "../components/AuthSwitchLink";

const SignupPage = () => {
  const [signupError, setSignupError] = useState<{ message: string; field: string }[]>([]);

  const navigate = useNavigate();

  const { mutate: signup, isPending: signupLoading, isError } = useSignupUser();

  const handleSignup = (data: SignupSchema) => {
    signup(data, {
      onSuccess: () => navigate("/"),
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errors = error.response?.data.error;
          setSignupError(errors);
        }
      },
    });
  };

  return (
    <CardContainer heading={"Create Account"}>
      <SignupForm onSubmit={handleSignup} isLoading={signupLoading} isError={isError} errors={signupError} />
      <AuthSwitchLink mode="signup" />
      <Divider />
      <GoogleLogin />
    </CardContainer>
  );
};

export default SignupPage;
