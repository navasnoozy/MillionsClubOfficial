import type { AddProductSchema } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useAddProduct = () => {
  console.log('use add product hook1');
  
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: AddProductSchema) => {
      console.log('inside the use add product hook');
      
      const { data } = await axiosInstance.post("/api/products/add", product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export default useAddProduct;