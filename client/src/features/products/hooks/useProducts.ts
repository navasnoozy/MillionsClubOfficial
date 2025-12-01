import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';
import type { AddProductSchema, AddProductVariant } from '@millionsclub/shared-libs/client';

interface ProductResponse extends Omit<AddProductSchema, 'variantIds'> {
  createdAt: Date;
  updatedAt: Date;
  variantIds: AddProductVariant[];
}

const useProducts = () => {
  return useQuery<ProductResponse[]>({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/api/products');
        return res.data.data;
      } catch (err) {
        console.error('Error fetching products:', err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useProducts;
