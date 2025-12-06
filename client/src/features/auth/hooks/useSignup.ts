import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { SignupInput } from "@millionsclub/shared-libs/client";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: { email: string };
}

const useSignupUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<ApiResponse>, SignupInput>({
    mutationKey: ["signup"],
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<ApiResponse>("/api/users/signup", credentials);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export default useSignupUser;
