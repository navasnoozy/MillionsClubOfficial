import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';

const useDeleteImage = () =>
  useMutation({
    mutationFn: async (public_id: string) => {
     console.log('mutation id', public_id);
     
      const res = await axiosInstance.delete('/api/image', { params: { public_id } });
      console.log(res.data.data);

      return res.data.data;
    },
  });

export default useDeleteImage;
