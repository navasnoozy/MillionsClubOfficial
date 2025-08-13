import { useNavigate } from "react-router";
import CardContainer from "../../../components/CardContainer"
import AddProductForm from "../components/AddProductForm"
import { useState } from "react";



const AddProduct = () => {

       const navigate = useNavigate();
  const [signinError, setSigninError] = useState<
    { message: string; field: string }[]
  >([]);

  const { mutate: signin, isPending, isError } = useaddpro;

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
     <CardContainer heading="Add Product" >
          <AddProductForm />
     </CardContainer>
  )
}

export default AddProduct