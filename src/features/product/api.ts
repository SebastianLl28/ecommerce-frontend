import apiClient from "@/lib/axios";
import type { AddToCartRequest, ProductResponse } from "./types";
import type { CartInfoResponse } from "../shopping-cart/types";

export const getProducts = async () => {
  return await apiClient
    .get<ProductResponse>("/products")
    .then((res) => res.data);
};
