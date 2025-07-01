import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

interface Credetials {
  email: string;
  password: string;
}

const useSigninUser = () =>
  useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: Credetials) => {
     const response = await axiosInstance.post("/api/users/signin", data);
     return response.data
    },
  });

export default useSigninUser;
