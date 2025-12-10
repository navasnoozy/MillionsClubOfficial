import type { idInput, UpdateUserInput } from "@millionsclub/shared-libs/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
  errors: { message: string; field: string }[];
}

type MutationPayload = idInput & { data: UpdateUserInput };

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, MutationPayload>({
    mutationFn: async ({ id, data }) => {
      const { data: res } = await axiosInstance.patch<ApiResponse>(`/api/admin/users/${id}`, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useUpdateUser;
