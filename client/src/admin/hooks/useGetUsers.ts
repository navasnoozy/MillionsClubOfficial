//src/admin/hooks/useGetUsers.ts

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import type { AxiosError } from "axios";
import type { User } from "../../interface/user";
import type { PaginationInput } from "@millionsclub/shared-libs/client";

interface ApiResponse {
  success: boolean;
  data?: User[];
  count: number;
}

const useGetUsers = (params: PaginationInput) => {
  const isPersist = !!localStorage.getItem("persist");

  return useQuery<ApiResponse, AxiosError<ApiResponse>>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse>("api/admin/users", { params });
      return data;
    },
    placeholderData: (prev) => prev,
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // enabled: isPersist,
  });
};

export default useGetUsers;
