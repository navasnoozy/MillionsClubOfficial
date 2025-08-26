import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { addProductSchema, type AddProductSchema } from '@millionsclub/shared-libs/client';
import FormPage from '../components/FormPage';
import ImageFrame from '../components/ImageFrame';
import InfoAlerts from '../components/InfoAlerts';
import ProductFormFields from '../components/ProductFormFields';
import useAddProduct from '../hooks/useAddProduct';
import handleApiError from '../utils/ApiErrorHandler';




const AddProduct = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState<{ message: string; field: string }[]>([]);
  const { mutate: addProduct, isPending, isError } = useAddProduct();

  const methods = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    mode: 'onSubmit',
  });

  const handleAddProduct = (data: AddProductSchema) => {
    addProduct(data, {
      onSuccess: (res) => navigate(`/admin/addvariant/${res.id}`),
      onError: (error) => handleApiError(error, setError),
    });
  };

  return (
    <FormPage
      heading="Add Product"
      methods={methods}
      onSubmit={handleAddProduct}
      left={<ProductFormFields isError={isError} errors={errors} />}
      right={<ImageFrame />}
      submitLabel="ADD PRODUCT"
      isLoading={isPending}
      showAlerts
      alerts={<InfoAlerts />}
    />
  );
};

export default AddProduct;
