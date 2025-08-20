import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

interface Categories {
     _id: string,
     name: string,
     slug: string;
     subcategories: string []
}

const useCategories = () => {
  return useQuery<Categories[] >({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products/category/list");
      console.log('get categories?',res.data);
      
       return res.data.data
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useCategories;
