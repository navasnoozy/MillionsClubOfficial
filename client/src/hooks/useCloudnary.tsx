import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

const useCloudinaryConfig = (folder: string) =>
  useQuery({
    queryKey: ["cloudinaryConfig", folder],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/image/config", {
        params: { folder },
      });
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!folder,
  });

export default useCloudinaryConfig;
