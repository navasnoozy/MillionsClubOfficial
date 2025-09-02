import { zodResolver } from '@hookform/resolvers/zod';
import type { AddCategory } from '@millionsclub/shared-libs/client';
import { addCategorySchema } from '@millionsclub/shared-libs/client';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import CardContainer from '../../../components/CardContainer';
import SubmitButton from '../../products/admin/components/SubmitButton';
import AddCategoryForm from '../components/AddCategoryForm';
import useAddCategory from '../hooks/useAddCategory';
import apiErrorHandler from '../../products/admin/utils/apiErrorHandler';

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addCategory, isPending, isError } = useAddCategory();

  const methods = useForm<AddCategory>({
    resolver: zodResolver(addCategorySchema),
  });

  const handleAddCategory = (data: AddCategory) => {
    addCategory(data, {
      onSuccess: () => {
        navigate(`/admin/categorymanagement`);
        methods.reset();
      },
      onError: (error) => apiErrorHandler(error, setError),
    });
  };

  return (
    <CardContainer heading="Add Category">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleAddCategory)}>
          <Stack spacing={3}>
            <AddCategoryForm isError={isError} errors={errors} />

            <SubmitButton isLoading={isPending} disabled={isPending} >ADD CATEGORY</SubmitButton>
          </Stack>
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default AddCategoryPage;
