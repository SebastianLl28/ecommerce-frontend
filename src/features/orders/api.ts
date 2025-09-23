import apiClient from "@/lib/axios";
import type { Order, OrderRequest, OrderResponse } from "./types";
import type { PaginatedResponse, Response } from "@/types/apiTypes";

export const postOrder = async (request: OrderRequest) => {
  return await apiClient.post("/orders", request).then((res) => res.data);
};

export const getOrder = async (id: number) => {
  return await apiClient
    .get<OrderResponse>(`/orders/${id}`)
    .then((res) => res.data);
};

export const getOrders = async () => {
  return await apiClient
    .get<Response<PaginatedResponse<Order>>>("/orders")
    .then((res) => res.data);
};
