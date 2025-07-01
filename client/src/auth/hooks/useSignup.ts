import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

interface Credetials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useSignupUser = () =>
  useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: Credetials) => {
      const respnse = await axiosInstance.post("/api/users/signup", data);
      return respnse.data;
    },
  });

export default useSignupUser;
