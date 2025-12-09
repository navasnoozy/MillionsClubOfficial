import { signinSchema, type SigninInput } from "@millionsclub/shared-libs/client";
import { Stack } from "@mui/material";
import { useState } from "react";
import AppButton from "../../../components/AppButton";
import CardContainer from "../../../components/CardContainer";
import FormInputField from "../../../components/FormInputField";
import useAppNavigate from "../../../hooks/useAppNavigate";
import AuthSwitchLink from "../components/AuthSwitchLink";
import Divider from "../components/Divider";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import useSigninUser from "../hooks/useSignin";
import GoogleLogin from "./GoogleLogin";
import { Form } from "../../../components/Form";
import AlertNotify from "../../../components/Alert";
import { toast } from "react-toastify";

const SigninPage = () => {
  const [errors, setErrors] = useState<{ message: string; field?: string }[] | null>(null);
  const { goHome } = useAppNavigate();

  const { mutateAsync: signin, isPending } = useSigninUser();

  useAuthRedirect();

  const handleSignin = (data: SigninInput) => {
    toast.promise(
      signin(data, {
        onSuccess: () => {
          goHome();
        },
        onError: (error) => {
          setErrors(error.response?.data.errors || null);
        },
      }),
      {
        pending: "Signin",
        success: "Welcome back",
        error: "Failed to login",
      }
    );
  };

  return (
    <CardContainer heading="Login">
      <Form onSubmit={handleSignin} schema={signinSchema}>
        <Stack spacing={3}>
          <FormInputField name="email" label={"Email"} />
          <FormInputField name="password" label={"Password"} />
          <AppButton loading={isPending} variant="contained" type="submit">
            Signin
          </AppButton>
        </Stack>
      </Form>
      <AlertNotify success={false} messages={errors}></AlertNotify>
      <AuthSwitchLink mode="signin" />
      <Divider />
      <GoogleLogin />
    </CardContainer>
  );
};

export default SigninPage;
