import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import type { CloudinarySignatureResponse } from "@millionsclub/shared-libs/client";

const useCloudinarySignature = (folder: string) =>
  useQuery<CloudinarySignatureResponse>({
    queryKey: ["cloudinarySecret", folder],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/image/signature", {
        params: { folder },
      });
      return res.data;
    },
    staleTime: 1000 * 60,
    enabled: !!folder,
  });

export default useCloudinarySignature;
