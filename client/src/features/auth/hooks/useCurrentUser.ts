//src/auth/hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useCurrentUser = () => {
  const isPersist = !!localStorage.getItem("persist");

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/users/currentuser");
      return response.data.currentUser ?? null;
    },
    enabled: isPersist,
  });
};

export default useCurrentUser;
