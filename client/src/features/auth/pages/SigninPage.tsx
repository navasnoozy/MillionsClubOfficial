import type { SigninSchema } from "@millionsclub/shared-libs/client";
import axios from "axios";
import { useState } from "react";
import CardContainer from "../../../components/CardContainer";
import useAppNavigate from "../../../hooks/useAppNavigate";
import AuthSwitchLink from "../components/AuthSwitchLink";
import Divider from "../components/Divider";
import SigninForm from "../components/SigninForm";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import useSigninUser from "../hooks/useSignin";
import GoogleLogin from "./GoogleLogin";

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
