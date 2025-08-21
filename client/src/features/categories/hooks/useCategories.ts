import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  subcategories: { _id: string; name: string }[];
}

const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products/category/list");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });
};

export default useCategories;