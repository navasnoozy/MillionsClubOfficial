import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { addProductSchema, type AddProductSchema } from '@millionsclub/shared-libs/client';
import FormLayout from '../components/FormLayout';
import ProductImageUploader from '../components/ProductImageUploader';
import InfoAlerts from '../components/InfoAlerts';

import apiErrorHandler from '../utils/apiErrorHandler';
import useCreateProduct from '../hooks/useCreateProduct';
import ProductFormFields from '../components/ProductFormFields';

const AdminAddProductPage = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addProduct, isPending, isError } = useCreateProduct();

  const methods = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    mode: 'onSubmit',
  });

  const handleAddProduct = (data: AddProductSchema) => {
    addProduct(data, {
      onSuccess: (res) => navigate(`/admin/addvariant/${res.id}`),
      onError: (error) => apiErrorHandler(error, setError),
    });
  };

  return (
    <FormLayout
      heading="Add Product"
      methods={methods}
      onSubmit={handleAddProduct}
      left={<ProductFormFields isError={isError} errors={errors} />}
      right={<ProductImageUploader />}
      submitLabel="ADD PRODUCT"
      isLoading={isPending}
      showAlerts
      alerts={<InfoAlerts />}
    />
  );
};

export default AdminAddProductPage;
