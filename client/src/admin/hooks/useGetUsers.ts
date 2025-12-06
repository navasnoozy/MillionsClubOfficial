import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import type { AxiosError } from "axios";
import type { User } from "../../interface/user";

interface ApiResponse {
  success: boolean;
  data?: User[];
  count: number;
}

export type Filters = {
  role: User["role"] | 'All' | undefined
  isActive: boolean | 'true'| "false" | undefined
  search: string | undefined
};

const useGetUsers = (filters: Filters | undefined) => {
  const isPersist = !!localStorage.getItem("persist");

  return useQuery<ApiResponse, AxiosError<ApiResponse>>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse>("api/admin/users", { params: { ...filters } });
      return data;
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // enabled: isPersist,
  });
};

export default useGetUsers;
