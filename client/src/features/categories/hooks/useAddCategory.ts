import type { AddCategory } from '@millionsclub/shared-libs/client';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';
import queryClient from '../../../lib/queryClient';

const useAddCategory = () => {
  return useMutation({
    mutationFn: async (data: AddCategory) => {
      const res = await axiosInstance.post('/api/products/category/add', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export default useAddCategory;
