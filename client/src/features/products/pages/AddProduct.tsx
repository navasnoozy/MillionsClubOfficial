import { zodResolver } from "@hookform/resolvers/zod";
import type { AddProductSchema } from "@millionsclub/shared-libs/client";
import { addProductSchema } from "@millionsclub/shared-libs/client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import CardContainer from "../../../components/CardContainer";
import AddProductForm from "../components/AddProductForm";
import useAddProduct from "../hooks/useAddProduct";
import handleApiError from "../utils/ApiErrorHandler";

import { Grid, ImageList, Typography } from "@mui/material";
import ImageFrame from "../../../components/ImageFrame";
import SubmitButton from "../components/SubmitButton";
import { boolean } from "zod/v4";

const AddProduct = () => {
  const navigate = useNavigate();
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addProduct, isPending, isError } = useAddProduct();

  const methods = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
  });

  const handleAddProduct = (data: AddProductSchema) => {
    addProduct(data, {
      onSuccess: (res) => {
        navigate(`/admin/addvariant/${res.id}`);
      },
      onError: (error) => handleApiError(error, setError),
    });
  };

  return (
    <CardContainer heading="Add Product">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleAddProduct)}>
          <Grid container spacing={3}>
            <Grid display={"flex"} size={{ xs: 12, md: 6 }}>
              <AddProductForm
                isLoading={isPending}
                isError={isError}
                errors={errors}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontSize: "15px" }}>
                If you add images for variants, upload here is optional.
              </Typography>
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
            <Grid size={12}>
              <SubmitButton
                label="ADD PRODUCT"
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

export default AddProduct;
