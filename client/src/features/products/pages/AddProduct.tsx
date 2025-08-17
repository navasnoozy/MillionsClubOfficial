import { useNavigate } from "react-router";
import CardContainer from "../../../components/CardContainer";
import AddProductForm from "../components/AddProductForm";
import { useState } from "react";
import useAddProduct from "../hooks/useAddProduct";
import type { AddProductSchema } from "@millionsclub/shared-libs/client";
import { useAuthRedirect } from "../../auth/hooks/useAuthRedirect";
import axios from "axios";
import handleApiError from "../utils/ApiErrorHandler";

const AddProduct = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState<{ message: string; field: string }[]>([]);

  const { mutate: addProduct, isPending, isError } = useAddProduct();

  useAuthRedirect();

  const handleAddProduct = (data: AddProductSchema) => {
    addProduct(data, {
      onSuccess: (res) => {
        navigate(  `/admin/addvariant/${res.id}`);
      },
    onError: (error) => handleApiError(error, setError),
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
