import { useNavigate } from "react-router";
import type { SignupSchema } from "@millionsclub/shared-libs/client";
import CardContainer from "../../../components/CardContainer";
import SignupForm from "../components/SignupForm";
import { authClient } from "../config/better-auth";
import { useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (formData: SignupSchema) => {
    const { data, error: authError } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          navigate("/");
          useCurrentUser()
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message);
        },
      }
    );
    console.log(`//////data ${data} and  error ${authError?.message}`);
  };

  return (
    <CardContainer heading={"Create Account"}>
      <SignupForm onSubmit={handleSignup} isLoading={isLoading} error={error} />
    </CardContainer>
  );
};

export default SignupPage;
