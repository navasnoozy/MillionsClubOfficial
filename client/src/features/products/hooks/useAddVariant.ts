import type { AddProductSchema } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useAddVariant = (id: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variant: AddProductSchema) => {
      const { data } = await axiosInstance.post(
        `/api/products/${id}/addvariant`,
        variant
      );
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export default useAddVariant;
