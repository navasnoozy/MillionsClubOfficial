// src/admin/hooks/useUsers.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateUserInput, UpdateUserInput, idInput, PaginationInput } from "@millionsclub/shared-libs/client";
import type { AxiosError } from "axios";
import axiosInstance from "../../../lib/axios";
import type { User } from "../interface/user";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { message: string; field: string }[];
  count?: number;
}

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params: PaginationInput) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

const userApi = {
  fetchAll: async (params: PaginationInput) => {
    const { data } = await axiosInstance.get<ApiResponse<User[]>>("api/admin/users", { params });
    return data;
  },
  create: async (payload: CreateUserInput) => {
    const { data } = await axiosInstance.post<ApiResponse>("/api/admin/users", payload);
    return data;
  },
  update: async ({ id, data }: { id: string; data: UpdateUserInput }) => {
    const { data: res } = await axiosInstance.patch<ApiResponse>(`/api/admin/users/${id}`, data);
    return res;
  },
  delete: async ({ id }: idInput) => {
    const { data } = await axiosInstance.delete<ApiResponse>(`/api/admin/users/${id}`);
    return data;
  },
};

export const useGetUsers = (params: PaginationInput) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userApi.fetchAll(params),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const invalidateUsers = () => {
    queryClient.invalidateQueries({ queryKey: userKeys.lists() });
  };

  const createUser = useMutation<ApiResponse, AxiosError<ApiResponse>, CreateUserInput>({
    mutationFn: userApi.create,
    onSuccess: invalidateUsers,
  });

  const updateUser = useMutation<ApiResponse, AxiosError<ApiResponse>, { id: string; data: UpdateUserInput }>({
    mutationFn: userApi.update,
    onSuccess: invalidateUsers,
  });

  const deleteUser = useMutation<ApiResponse, AxiosError<ApiResponse>, idInput>({
    mutationFn: userApi.delete,
    onSuccess: invalidateUsers,
  });

  return {
    createUser,
    updateUser,
    deleteUser,
  };
};
