import { zodResolver } from '@hookform/resolvers/zod';
import type { AddProductSchema } from '@millionsclub/shared-libs/client';
import { addProductSchema } from '@millionsclub/shared-libs/client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import CardContainer from '../../../components/CardContainer';
import AddProductForm from '../components/AddProductForm';
import useAddProduct from '../hooks/useAddProduct';
import handleApiError from '../utils/ApiErrorHandler';

import { Alert, Button, Grid, Stack } from '@mui/material';
import ImageFrame from '../../../components/ImageFrame';
import SubmitButton from '../components/SubmitButton';

const AddProduct = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addProduct, isPending, isError } = useAddProduct();

  const methods = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
  });

  const handleAddProduct = (data: AddProductSchema) => {
    console.log('submit is working');
    
    addProduct(data, {
      onSuccess: (res) => {
        navigate(`/admin/addvariant/${res.id}`);
      },
      onError: (error) => {
        console.log('error check .........',error);

        handleApiError(error, setError);
      },
    });
  };

  return (
    <CardContainer heading="Add Product">
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(handleAddProduct)}>
          <Grid container spacing={3}>
            <Grid display={'flex'} size={{ xs: 12, md: 6 }}>
              <AddProductForm isError={isError} errors={errors} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} alignContent={'center'}>
              <ImageFrame />
            </Grid>
            <Grid size={12}>
              <SubmitButton  isLoading={isPending} disabled={isPending} >ADD PRODUCT</SubmitButton>
            </Grid>
          </Grid>
          <Stack sx={{ justifySelf: 'center', paddingTop: 2 }}>
            <Alert sx={{ p: 0, m: 0 }} severity="info">
              If you add images for variants, upload here is optional.
            </Alert>
            <Alert sx={{ p: 0, m: 0 }} severity="info">
              Each product must have at least 4 photos.
            </Alert>
            <Alert sx={{ p: 0, m: 0 }} severity="info">
              All photos must be in a 1:1 aspect ratio (square).
            </Alert>
          </Stack>
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default AddProduct;

