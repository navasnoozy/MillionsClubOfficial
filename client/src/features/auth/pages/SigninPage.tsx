import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import type { SigninSchema } from "@millionsclub/shared-libs/client";
import useSigninUser from "../hooks/useSignin";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import CardContainer from "../../../components/CardContainer";
import SigninForm from "../components/SigninForm";
import GoogleLogin from "./GoogleLogin";
import Divider from "../components/Divider";
import AuthSwitchLink from "../components/AuthSwitchLink";

const SigninPage = () => {
  const navigate = useNavigate();
  const [signinError, setSigninError] = useState<{ message: string; field: string }[]>([]);

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
    <CardContainer heading="Login">
      <SigninForm onSubmit={handleSignin} isLoading={isPending} isError={isError} errors={signinError} />
      <AuthSwitchLink mode="signin" />
      <Divider />
      <GoogleLogin />
    </CardContainer>
  );
};

export default SigninPage;
