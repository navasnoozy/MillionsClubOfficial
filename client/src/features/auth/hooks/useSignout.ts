import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { setAccessToken } from "../../../lib/axios";

const useSignout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signout"],
    mutationFn: async () => {
      const response = await axiosInstance.get("/api/users/signout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      setAccessToken(null);
    },
  });
};

export default useSignout;
