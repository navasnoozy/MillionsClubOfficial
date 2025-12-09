import { useState } from "react";
import CardContainer from "../../../components/CardContainer";
import useCreateUser from "../hooks/useCreateUser";
import { createUserSchema, type CreateUserInput } from "@millionsclub/shared-libs/client";
import { toast } from "react-toastify";
import { Form } from "../../../components/Form";
import { Stack } from "@mui/material";
import FormInputField from "../../../components/FormInputField";
import AppButton from "../../../components/AppButton";
import AlertNotify from "../../../components/Alert";
import FormDropdown from "../../../components/FormDropdown";


const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Moderator", value: "moderator" },
  { label: "Customer", value: "customer" },
];

const CreateUser = () => {
  const [errors, setErrors] = useState<{ message: string; field: string }[] | null>(null);

  const { mutateAsync: signup, isPending } = useCreateUser();

  const handleSignup = (data: CreateUserInput) => {
    toast.promise(
      signup(data, {
        onSuccess: () => {},
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
      <Form onSubmit={handleSignup} schema={createUserSchema}>
        <Stack spacing={3}>
          <FormInputField type="name" name="name" label={"Name"} />
          <FormInputField type="email" name="email" label={"Email"} />
          <FormInputField type="password" name="password" label={"Password"} />
          <FormInputField name="confirmPassword" label={"ConfirmPassword"} type="password" />
          <FormDropdown name="role" options={ROLE_OPTIONS} />
          <AppButton loading={isPending} variant="contained" type="submit">
            Signup
          </AppButton>
        </Stack>
      </Form>
      <AlertNotify success={false} messages={errors}></AlertNotify>
    </CardContainer>
  );
};

export default CreateUser;
