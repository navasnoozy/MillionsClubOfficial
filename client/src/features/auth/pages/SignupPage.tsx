//src/features/auth/pages/SignupPage.tsx

import { signupSchema, type SignupInput } from "@millionsclub/shared-libs/client";
import { Stack } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import AlertNotify from "../../../components/Alert";
import AppButton from "../../../components/AppButton";
import CardContainer from "../../../components/CardContainer";
import { Form } from "../../../components/Form";
import FormInputField from "../../../components/FormInputField";
import useAppNavigate from "../../../hooks/useAppNavigate";
import AuthSwitchLink from "../components/AuthSwitchLink";
import Divider from "../components/Divider";
import useSignupUser from "../hooks/useSignup";
import GoogleLogin from "./GoogleLogin";

const SignupPage = () => {
  const { goToVerifyPage } = useAppNavigate();
  const [errors, setErrors] = useState<{ message: string; field: string }[] | null>(null);

  const { mutateAsync: signup, isPending } = useSignupUser();

  const handleSignup = (data: SignupInput) => {
    toast.promise(
      signup(data, {
        onSuccess: (res) => {
          goToVerifyPage(res.data?.email);
        },
        onError: (error) => {
          setErrors(error.response?.data.errors || []);
        },
      }),
      {
        pending: "Creating account...",
        success: "Account has been created",
        error: "Failed to create account",
      }
    );
  };

  return (
    <CardContainer heading={"Create Account"}>
      <Form onSubmit={handleSignup} schema={signupSchema}>
        <Stack spacing={3}>
          <FormInputField name="name" label={"Name"} />
          <FormInputField name="email" label={"Email"} />
          <FormInputField name="password" label={"Password"} />
          <FormInputField name="confirmPassword" label={"ConfirmPassword"} />
          <AppButton loading={isPending} variant="contained" type="submit">
            Signup
          </AppButton>
        </Stack>
      </Form>
      <AlertNotify success={false} messages={errors}></AlertNotify>
      <AuthSwitchLink mode="signup" />
      <Divider />
      <GoogleLogin />
    </CardContainer>
  );
};

export default SignupPage;
