import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { setAccessToken } from "../../../lib/axios";
import type { AxiosError } from "axios";
import type { SigninInput } from "@millionsclub/shared-libs/client";

interface ApiResponse {
  success: boolean;
  messsage: string;
  data?: { email: string; accessToken: string };
  errors: { message: string; field: string }[];
}

const useSigninUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<ApiResponse>, SigninInput>({
    mutationKey: ["signin"],
    mutationFn: async (credential) => {
      const { data } = await axiosInstance.post("/api/users/signin", credential);
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

export default useSigninUser;
