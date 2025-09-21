import apiClient from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "./types";
import type { Response } from "@/types/apiTypes";

export const postLogin = async (data: LoginRequest) => {
  return await apiClient
    .post<LoginResponse>("/auth/login", data)
    .then((res) => res.data);
};

export const getSession = async () => {
  return await apiClient
    .get<LoginResponse>("/auth/session")
    .then((res) => res.data);
};

export const postLogout = async () => {
  return await apiClient
    .post<Response<null>>("/auth/logout")
    .then((res) => res.data);
};
