import apiClient from "@/lib/axios";
import type { ApiResponse, CreateUserPayload, UserDTO } from "./types";

export const getUsers = async () =>
  await apiClient.get<ApiResponse<UserDTO[]>>("/users");

export const createUser = (payload: CreateUserPayload) =>
  apiClient.post<ApiResponse<UserDTO>>("/users", payload);

export const updateUser = async (
  id: number,
  payload: Partial<Omit<UserDTO, "id">>
) => await apiClient.put<ApiResponse<UserDTO>>(`/users/${id}`, payload);

export const deleteUser = async (id: number) =>
  await apiClient.delete<ApiResponse<null>>(`/users/${id}`);

export const getUser = async (id: number) => {
  const res = await apiClient.get<ApiResponse<UserDTO>>(`/users/${id}`);
  return res.data.data;
};
