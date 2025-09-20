import apiClient from "@/lib/axios"
import type { IProduct } from "./types"

export const getProducts = async () => {
  return await apiClient.get<IProduct[]>("/products").then(res => res.data) 
}