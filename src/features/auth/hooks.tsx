import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getSession, postLogin, postLogout } from "./api";
import type { LoginResponse } from "./types";
import { useLogin, useAuthLogout } from "@/store/authStore";

export const usePostLogin = () => {
  const navigate = useNavigate();
  const login = useLogin();

  return useMutation({
    mutationKey: ["postLogin"],
    mutationFn: postLogin,
    onSuccess: (response: LoginResponse) => {
      if (response.success) {
        login(response.data!);
        toast.success("Login Exitoso");
        navigate("/products");
        return;
      }
      toast.error(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetSession = () =>
  useQuery({
    queryKey: ["getSession"],
    queryFn: getSession,
    staleTime: 0, // always fetch the latest session
    retry: false, // do not retry on failure
  });

export const usePostLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthLogout();
  return useMutation({
    mutationKey: ["postLogout"],
    mutationFn: postLogout,
    onSuccess: (response) => {
      toast.success(response.message);
      logout();
      navigate("/");
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
};
