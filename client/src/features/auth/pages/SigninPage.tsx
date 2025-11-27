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
import useAppNavigate from "../../../hooks/useAppNavigate";

const SigninPage = () => {
  const [error, setError] = useState<string>("");
  const { goHome } = useAppNavigate();

  const { mutate: signin, isPending, isError } = useSigninUser();

  useAuthRedirect();

  const handleSignin = (data: SigninSchema) => {
    signin(data, {
      onSuccess: () => {
        goHome();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.messsage || "Something went wrong");
        }
      },
    });
  };

  return (
    <CardContainer heading="Login">
      <SigninForm onSubmit={handleSignin} isLoading={isPending} isError={isError} error={error} />
      <AuthSwitchLink mode="signin" />
      <Divider />
      <GoogleLogin />
    </CardContainer>
  );
};

export default SigninPage;
