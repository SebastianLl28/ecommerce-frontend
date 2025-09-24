import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminOrder, getAdminOrders, patchOrderStatus } from "./api";
import type { OrderStatus } from "./types";

export function useGetAdminOrders(params: {
  status?: OrderStatus;
  page?: number;
  size?: number;
}) {
  return useQuery({
    queryKey: ["getAdminOrders", params],
    queryFn: () => getAdminOrders(params),
    // staleTime: 30_000,
  });
}

// DETALLE (admin)
export function useGetAdminOrder(id: number, opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["getAdminOrder", id],
    queryFn: () => getAdminOrder(id),
    enabled: opts?.enabled ?? true,
    // staleTime: 15_000,
  });
}

// ACTUALIZAR ESTADO (admin)
export function useUpdateOrderStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["patchOrderStatus"],
    mutationFn: patchOrderStatus,
    onSuccess: (resp) => {
      // Invalida lista y detalle
      qc.invalidateQueries({ queryKey: ["getAdminOrders"] });
      if (resp?.data?.id) {
        qc.invalidateQueries({ queryKey: ["getAdminOrder", resp.data.id] });
      }
    },
  });
}
