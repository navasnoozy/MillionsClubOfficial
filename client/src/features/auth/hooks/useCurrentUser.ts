//src/auth/hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";

const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/users/currentuser");
      return response.data.currentUser ?? null;
    },
  });

export default useCurrentUser;
