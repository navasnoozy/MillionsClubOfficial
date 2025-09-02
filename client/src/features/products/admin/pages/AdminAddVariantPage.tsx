import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { addProductVariantSchema, type AddProductVariant } from '@millionsclub/shared-libs/client';

import apiErrorHandler from '../utils/apiErrorHandler';
import FormLayout from '../components/FormLayout';
import ProductImageUploader from '../components/ProductImageUploader';
import useCreateVariant from '../hooks/useCreateVariant';
import VariantFormFields from '../components/VariantFormFields';
import InfoAlerts from '../components/InfoAlerts';

const AdminAddVariantPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Product ID is required</div>;

  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addVariant, isPending, isError } = useCreateVariant(id);

  const methods = useForm<AddProductVariant>({
    resolver: zodResolver(addProductVariantSchema),
    mode: 'onSubmit',
  });

  const handleAddVariant = (data: AddProductVariant) => {
    addVariant(data, {
      onSuccess: () => navigate('/productmanagement'),
      onError: (error) => apiErrorHandler(error, setError),
    });
  };

  const alerts = [
    'Each product must have at least 4 photos.',
    'All photos must be in a 1:1 aspect ratio (square).',
  ];

  return (
    <FormLayout
      heading="Add Variant"
      methods={methods}
      onSubmit={handleAddVariant}
      left={<VariantFormFields isError={isError} errors={errors} />}
      right={<ProductImageUploader />}
      submitLabel="Add VARIANT"
      isLoading={isPending}
      alerts={<InfoAlerts messages={alerts} />}
    />
  );
};

export default AdminAddVariantPage;
