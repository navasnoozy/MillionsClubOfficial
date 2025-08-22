import type { AddProductSchema } from '@millionsclub/shared-libs/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';

const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: AddProductSchema) => {
      const { data } = await axiosInstance.post('/api/products/add', product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export default useAddProduct;
