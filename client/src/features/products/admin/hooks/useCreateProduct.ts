import type { AddProductSchema } from '@millionsclub/shared-libs/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../lib/axios';

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: AddProductSchema) => {
      const res = await axiosInstance.post('/api/products/add', product);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export default useCreateProduct;
