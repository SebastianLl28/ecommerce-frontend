// features/users/hooks.tsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./api";
import type { UserDTO } from "./types";

export const useGetUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: getUsers });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["users", "create"],
    mutationFn: createUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Usuario creado");
      qc.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Error al crear"),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["users", "update"],
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateUser(id, payload),
    onSuccess: (res) => {
      toast.success(res.data.message || "Usuario actualizado");
      qc.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Error al actualizar"),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["users", "delete"],
    mutationFn: deleteUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Usuario eliminado");
      qc.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Error al eliminar"),
  });
};

export const useGetUser = (id: number, options?: { enabled?: boolean }) =>
  useQuery<UserDTO>({
    queryKey: ["getUser", id],
    queryFn: () => getUser(id),
    enabled: (options?.enabled ?? true) && id > 0,
    staleTime: 60_000,
  });
