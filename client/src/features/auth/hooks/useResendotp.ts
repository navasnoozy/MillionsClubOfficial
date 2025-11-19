import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

interface Response {
  success: boolean;
  message: string;
}

const useResendotp = () => {
  return useMutation({
    mutationKey: ["sendotp"],
    mutationFn: async (email: string) => {
      const { data } = await axiosInstance.post("/api/notification/resend-otp", email);
      return data;
    },
  });
};

export default useResendotp;
