import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

const useDeleteImage = () =>
  useMutation({
    mutationFn: async (public_id:string) => {
      const res = await axiosInstance.get("/api/image", {
        params: { public_id },
      });

      return res.data.data;
    },
  });

export default useDeleteImage;
