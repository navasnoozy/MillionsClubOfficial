import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";


interface Categories {
  _id: string;
  name: string;
  slug: string;
  subcategories: string[];
}

const useSubCategories = () => {
  return useQuery<Categories[]>({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/inventory/category");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useSubCategories;
