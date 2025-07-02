import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

interface Credetials {
  email: string;
  password: string;
}

const useSigninUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: Credetials) => {
      const response = await axiosInstance.post("/api/users/signin", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export default useSigninUser;
