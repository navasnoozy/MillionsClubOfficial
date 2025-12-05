import type { CreateProductVariantInput } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

const useCreateVariant = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variant: CreateProductVariantInput) => {
      const { data } = await axiosInstance.post(`/api/inventory/products/${id}`, variant);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export default useCreateVariant;
