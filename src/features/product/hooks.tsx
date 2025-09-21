import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartInfo, getProducts, postAddToCart } from "./api";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
