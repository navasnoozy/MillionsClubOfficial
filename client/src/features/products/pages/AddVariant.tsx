import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { addProductVariantSchema, type AddProductVariant } from '@millionsclub/shared-libs/client';
import useAddVariant from '../hooks/useAddVariant';
import handleApiError from '../utils/ApiErrorHandler';
import FormPage from '../components/FormPage';
import VariantFormFields from '../components/VariantFormFields';
import ImageFrame from '../components/ImageFrame';

const AddVariant: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Product ID is required</div>;

  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addVariant, isPending, isError } = useAddVariant(id);

  const methods = useForm<AddProductVariant>({
    resolver: zodResolver(addProductVariantSchema),
    mode: 'onSubmit',
  });

  const handleAddVariant = (data: AddProductVariant) => {
    addVariant(data, {
      onSuccess: () => navigate('/productmanagement'),
      onError: (error) => handleApiError(error, setError),
    });
  };

  return (
    <FormPage
      heading="Add Variant"
      methods={methods}
      onSubmit={handleAddVariant}
      left={<VariantFormFields isError={isError} errors={errors} />}
      right={<ImageFrame />}
      submitLabel="Add VARIANT"
      isLoading={isPending}
    />
  );
};

export default AddVariant;
