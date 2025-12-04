import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
}

const useResendotp = () => {
  return useMutation<ApiResponse, AxiosError<ApiResponse>, string>({
    mutationKey: ["sendotp"],
    mutationFn: async (email: string) => {
      const { data } = await axiosInstance.post<ApiResponse>("/api/otp/resend", { email });

      return data;
    },
  });
};

export default useResendotp;
