import type { AddProductSchema } from "@millionsclub/shared-libs/client";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import CardContainer from "../../../components/CardContainer";
import { useAuthRedirect } from "../../auth/hooks/useAuthRedirect";
import AddVariantForm from "../components/AddVariantsForm";
import useAddVariant from "../hooks/useAddVariant";
import handleApiError from "../utils/ApiErrorHandler";

const AddVariant = () => {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }> ();
  if (!id) {
    return <div>Product ID is required</div>;
  }

  const [errors, setError] = useState<{ message: string; field: string }[]>([]);

  const { mutate: addVariant, isPending, isError } = useAddVariant(id);

  useAuthRedirect();

  const handleAddVariant = (data: AddProductSchema) => {
    addVariant(data, {
      onSuccess: () => {
        navigate("/productmanagement");
      },
      onError: (error) => handleApiError(error, setError),
    });
  };

  return (
    <CardContainer heading="Add Product">
      <AddVariantForm
        onSubmit={handleAddVariant}
        isLoading={isPending}
        isError={isError}
        errors={errors}
      />
    </CardContainer>
  );
};

export default AddVariant;