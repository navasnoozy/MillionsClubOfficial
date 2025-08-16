import type { AddProductSchema } from "@millionsclub/shared-libs/client";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import CardContainer from "../../../components/CardContainer";
import { useAuthRedirect } from "../../auth/hooks/useAuthRedirect";
import AddProductForm from "../components/AddProductForm";
import useAddVariant from "../hooks/useAddVariant";

const AddProduct = () => {
  const navigate = useNavigate();
  const {id} = useParams ()
  const [errors, setError] = useState<{ message: string; field: string }[]>([]);

  const { mutate: addProduct, isPending, isError } = useAddVariant(id);

  useAuthRedirect();

  const handleAddProduct = (data: AddProductSchema) => {
    addProduct(data, {
      onSuccess: () => {
        navigate("/productmanagement");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errors = error.response?.data.error;
          setError(errors);
        }
      },
    });
  };

  return (
    <CardContainer heading="Add Product">
      <AddProductForm
        onSubmit={handleAddProduct}
        isLoading={isPending}
        isError={isError}
        errors={errors}
      />
    </CardContainer>
  );
};

export default AddProduct;