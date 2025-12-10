import type { CreateUserInput } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axiosInstance from "../../../lib/axios";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {};
  errors: { message: string; field: string }[];
}

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, CreateUserInput>({
    mutationFn: async (data) => {
      const { data: res } = await axiosInstance.post<ApiResponse>(`/api/admin/users`, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useCreateUser;
