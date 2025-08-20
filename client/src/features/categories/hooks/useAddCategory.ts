import type { AddCategory } from "@millionsclub/shared-libs/client";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useAddCategory = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (data: AddCategory) => {
      const res = await axiosInstance.post("/api/products/category/add", data);
      return res.data;
    },
  });
};

export default useAddCategory;
