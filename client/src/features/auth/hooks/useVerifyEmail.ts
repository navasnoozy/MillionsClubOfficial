import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { setAccessToken } from "../../../lib/axios";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: { email: string; accessToken: string };
}

interface Payload {
  email: string;
  otp: string | number;
}

const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<ApiResponse>, Payload>({
    mutationKey: ["veriyemail"],
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<ApiResponse>("/api/verify/email", credentials);

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      if (data.data?.accessToken) {
        setAccessToken(data.data.accessToken);
        localStorage.setItem("persist", "true");
      }
    },
  });
};

export default useVerifyEmail;
