import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AuthContainer from "../features/auth/AuthContainer";
import useSigninUser from "../features/auth/hooks/useSignin";
import { useAuthRedirect } from "../features/auth/hooks/useAuthRedirect";
import SigninForm from "../features/auth/SigninForm";
import type { SigninSchema } from "@millionsclub/shared-libs";

const SigninPage = () => {
  const navigate = useNavigate();
  const [signinError, setSigninError] = useState<
    { message: string; field: string }[]
  >([]);

  const { mutate: signin, isPending, isError } = useSigninUser();

  useAuthRedirect();

  const handleSignin = (data: SigninSchema) => {
    signin(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errors = error.response?.data.error;
          setSigninError(errors);
        }
      },
    });
  };

  return (
    <AuthContainer heading="Login">
      <SigninForm
        onSubmit={handleSignin}
        isLoading={isPending}
        isError={isError}
        errors={signinError}
      />
    </AuthContainer>
  );
};

export default SigninPage;
