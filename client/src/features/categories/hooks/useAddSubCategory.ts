import type { AddSubCategory } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useAddSubCategory = () => {
   const queryClient = useQueryClient ();
  return useMutation({
    mutationKey: ["subcategory"],
    mutationFn: async (data: AddSubCategory) => {
      const res = await axiosInstance.post(
        `/api/products/subcategory/add`,
        data
      );
      return res.data;
    },
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories','subcategories'] });
    },
  });
};

export default useAddSubCategory;
