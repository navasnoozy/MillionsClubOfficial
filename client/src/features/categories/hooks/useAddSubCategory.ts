import type { AddSubCategory } from "@millionsclub/shared-libs/client";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useAddSubCategory = () => {
  return useMutation({
    mutationKey: ["subcategory"],
    mutationFn: async (data: AddSubCategory) => {
      const res = await axiosInstance.post(
        `/api/products/subcategory/add`,
        data
      );
      return res.data;
    },
  });
};

export default useAddSubCategory;
