import { zodResolver } from '@hookform/resolvers/zod';
import type { AddSubCategory } from '@millionsclub/shared-libs/client';
import { addSubCategorySchema } from '@millionsclub/shared-libs/client';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import CardContainer from '../../../components/CardContainer';
import SubmitButton from '../../products/admin/components/SubmitButton';
import apiErrorHandler from '../../products/admin/utils/apiErrorHandler';
import AddSubCategoryForm from '../components/AddSubCategoryForm';
import useAddSubCategory from '../hooks/useAddSubCategory';

const AddSubCategoryPage = () => {
  const navigate = useNavigate();

  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addSubCategory, isPending, isError } = useAddSubCategory();

  const methods = useForm<AddSubCategory>({
    resolver: zodResolver(addSubCategorySchema),
  });

  const handleAddSubCategories = (data: AddSubCategory) => {
    addSubCategory(data, {
      onSuccess: () => {
        navigate(`/admin/categorymanagement`);
        methods.reset();
      },
      onError: (error) => apiErrorHandler(error, setError),
    });
  };

  return (
    <CardContainer heading="Add Sub-Category">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleAddSubCategories)}>
          <Stack spacing={3}>
            <AddSubCategoryForm isError={isError} errors={errors} />

            <SubmitButton label="ADD SUB CATEGORY" isLoading={isPending} disabled={isPending} />
          </Stack>
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default AddSubCategoryPage;
