import type { AddCategory } from '@millionsclub/shared-libs/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';

const useAddCategory = () => {
  const queryClient = useQueryClient ();
  
  return useMutation({
    mutationFn: async (data: AddCategory) => {
      const res = await axiosInstance.post('/api/products/category', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export default useAddCategory;
