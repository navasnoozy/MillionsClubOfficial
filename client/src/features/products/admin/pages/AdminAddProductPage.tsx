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
      onSuccess: (res) => {
        console.log('checking res ', res);
        
        navigate(`/admin/addvariant/${res._id}`)},
      onError: (error) => apiErrorHandler(error, setError),
    });
  };


  const alerts = [
  "If you add images for variants, upload here is optional.",
  "Each product must have at least 4 photos.",
  "All photos must be in a 1:1 aspect ratio (square)."
]


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
      alerts={<InfoAlerts messages={alerts} />}
    />
  );
};

export default AdminAddProductPage;
