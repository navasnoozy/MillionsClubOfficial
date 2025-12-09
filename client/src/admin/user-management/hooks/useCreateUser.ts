import type { CreateUserInput, idInput } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: { };
  errors: { message: string; field: string }[];
}


const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, CreateUserInput>({
    mutationFn: async (userdata) => {
      const { data } = await axiosInstance.post<ApiResponse>(`/api/admin/users`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useCreateUser;
