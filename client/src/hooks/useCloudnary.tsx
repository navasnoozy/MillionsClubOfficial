import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import type { CloudinarySignatureResponse } from "@millionsclub/shared-libs/client";

const useCloudinarySignature = (folder: string) =>
  useQuery<CloudinarySignatureResponse>({
    queryKey: ["cloudinarySecret", folder],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products/image/signature", {
        params: { folder },

      });
      console.log('hook', res.data);
      
      return res.data;
    },
    staleTime: 1000 * 60,
    enabled: !!folder,
  });

export default useCloudinarySignature;
