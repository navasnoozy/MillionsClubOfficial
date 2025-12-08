import type { idInput } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
}

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, idInput>({
    mutationFn: async ({ id }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { data } = await axiosInstance.delete<ApiResponse>(`/api/admin/users/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useCreateProduct;
