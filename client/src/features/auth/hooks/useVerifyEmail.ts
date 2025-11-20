import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
}

interface Payload {
  email: string;
  otp: string | number;
}

const useVerifyEmail = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, Payload>({
    mutationKey: ["veriyemail"],
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<ApiResponse>("/api/notification/verify-email", credentials);

      return data;
    },
  });
};

export default useVerifyEmail;
