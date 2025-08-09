import { useNavigate } from "react-router";
import { useAuthRedirect } from "../features/auth/hooks/useAuthRedirect";
import useSignupUser from "../features/auth/hooks/useSignup";
import axios from "axios";
import { useState } from "react";
import SignupForm from "../features/auth/SignupForm";
import AuthContainer from "../features/auth/AuthContainer";
import type { SignupSchema } from "@millionsclub/shared-libs/client";

const SignupPage = () => {
  const [signupError, setSignupError] = useState<
    { message: string; field: string }[]
  >([]);

  const navigate = useNavigate();

  const { mutate: signup, isPending: signupLoading, isError } = useSignupUser();

  useAuthRedirect();

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
    <AuthContainer heading={"Create Account"}>
      <SignupForm
        onSubmit={handleSignup}
        isLoading={signupLoading}
        isError={isError}
        errors={signupError}
      />
    </AuthContainer>
  );
};

export default SignupPage;
