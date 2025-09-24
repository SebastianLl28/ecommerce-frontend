import apiClient from "@/lib/axios";
import type { ApiResponse, OrderDTO, OrderStatus, Page } from "./types";

export async function getAdminOrders(params: {
  status?: OrderStatus;
  page?: number;
  size?: number;
}) {
  const { status, page = 0, size = 99999 } = params ?? {};
  const res = await apiClient.get<ApiResponse<Page<OrderDTO>>>(
    "/admin/orders",
    {
      params: { page, size, ...(status ? { status } : {}) },
    }
  );
  return res.data;
}

export async function getAdminOrder(id: number) {
  const res = await apiClient.get<ApiResponse<OrderDTO>>(`/admin/orders/${id}`);
  return res.data;
}

export async function patchOrderStatus(input: {
  id: number;
  status: OrderStatus;
}) {
  const { id, status } = input;
  // Backend espera status por query param
  const res = await apiClient.patch<ApiResponse<OrderDTO>>(
    `/admin/orders/${id}/status`,
    null,
    { params: { status } }
  );
  return res.data;
}
