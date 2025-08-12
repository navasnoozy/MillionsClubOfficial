import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => await axiosInstance.get("/api/products/list"),
  });

  export default useProducts
