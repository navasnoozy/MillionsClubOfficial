import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import type {SignupSchema} from '@millionsclub/shared-libs/client'
import axios from "axios";

const  useSignupUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (credentials: SignupSchema) => {
      const {data} = await axiosInstance.post("/api/users/signup", credentials);
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['currentUser']})
    },
  
  });
};

export default useSignupUser;
