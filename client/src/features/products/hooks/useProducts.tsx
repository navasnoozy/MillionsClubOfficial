import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {const res = await axiosInstance.get("/api/products/list")
       return res.data
    },
    staleTime: 1000*60*60*24
  });

  export default useProducts
