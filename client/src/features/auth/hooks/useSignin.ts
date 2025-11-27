import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { setAccessToken } from "../../../lib/axios";
import type { SigninSchema } from "@millionsclub/shared-libs/client";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  messsage: string;
  data?: { email: string; accessToken: string };
}

const useSigninUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<ApiResponse>, SigninSchema>({
    mutationKey: ["signin"],
    mutationFn: async (credential: SigninSchema) => {
      const { data } = await axiosInstance.post("/api/users/signin", credential);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      if (data.data?.accessToken) {
        console.log('checking access token ',data.data?.accessToken );
        
        setAccessToken(data.data.accessToken);
      }
    },
  });
};

export default useSigninUser;
