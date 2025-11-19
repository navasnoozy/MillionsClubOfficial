import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { SignupSchema } from "@millionsclub/shared-libs/client";


interface Response {
  success: boolean;
  data: { email: string };
}

const useSignupUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (credentials: SignupSchema) => {
      const { data } = await axiosInstance.post<Response>(
        "/api/users/signup",
        credentials
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export default useSignupUser;
