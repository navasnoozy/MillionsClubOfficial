import { zodResolver } from "@hookform/resolvers/zod";
import type { AddProductVariant } from "@millionsclub/shared-libs/client";
import { addProductVariantSchema } from "@millionsclub/shared-libs/client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import CardContainer from "../../../components/CardContainer";
import AddVariantForm from "../components/AddVariantsForm";
import useAddVariant from "../hooks/useAddVariant";
import handleApiError from "../utils/ApiErrorHandler";

import {
  Grid,
  ImageList
} from "@mui/material";
import ImageFrame from "../../../components/ImageFrame";
import SubmitButton from "../components/SubmitButton";

const AddVariant = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Product ID is required</div>;
  }

  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addVariant, isPending, isError } = useAddVariant(id);

  const methods = useForm<AddProductVariant>({
    resolver: zodResolver(addProductVariantSchema),
  });

  const handleAddVariant = (data: AddProductVariant) => {
    addVariant(data, {
      onSuccess: () => navigate("/productmanagement"),
      onError: (error) => handleApiError(error, setError),
    });
  };

  return (
    <CardContainer heading="Add Variant">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleAddVariant)}>
          <Grid container spacing={3}>
          <Grid display={"flex"}  size={{xs:12, md:6}} >
            <AddVariantForm
              isLoading={isPending}
              isError={isError}
              errors={errors}
            />
          </Grid>
          <Grid size={{xs:12, md:6}} >
            <ImageList
              variant="quilted"
              cols={3}
              rowHeight={200}
              gap={4}
              sx={{ border: "2px solid gray", borderRadius: 2 }}
            >
              <ImageFrame />
            </ImageList>
          </Grid>
          <Grid size={12} >
            <SubmitButton
              label="ADD VARIANT"
              isLoading={isPending}
              disabled={isPending}
            />
          </Grid>
          </Grid>
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default AddVariant;
