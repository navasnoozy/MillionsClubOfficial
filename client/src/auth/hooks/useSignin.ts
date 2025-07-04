import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import type { SigninSchema } from "@millionsclub/shared-libs/client";

const useSigninUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (credential: SigninSchema) => {
      const { data } = await axiosInstance.post(
        "/api/users/signin",
        credential
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export default useSigninUser;
