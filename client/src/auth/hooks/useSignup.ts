import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

interface Credetials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useSignupUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: Credetials) => {
      const respnse = await axiosInstance.post("/api/users/signup", data);
      return respnse.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['currentUser']})
    },
  });
};

export default useSignupUser;
