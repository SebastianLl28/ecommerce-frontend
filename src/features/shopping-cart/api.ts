import apiClient from "@/lib/axios";
import type {
  AddToCartRequest,
  CartInfoResponse,
  CartItemResponse,
} from "./types";
import type { ProductResponse } from "../product/types";

export const getCartItems = async () => {
  return apiClient.get<CartItemResponse>("/cart").then((res) => res.data);
};

export const postAddToCart = async (request: AddToCartRequest) => {
  return await apiClient
    .post<ProductResponse>("/cart/add", null, {
      params: {
        productId: request.productId,
        quantity: request.quantity,
      },
    })
    .then((res) => res.data);
};

export const getCartInfo = async () => {
  return await apiClient
    .get<CartInfoResponse>("/cart/info")
    .then((res) => res.data);
};
