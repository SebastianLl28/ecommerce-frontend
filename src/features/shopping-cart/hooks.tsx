import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartInfo, getCartItems, postAddToCart } from "./api";
import { useCartCount, useSetCartCount } from "@/store/useCartStore";

export const useGetCartItems = () =>
  useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

export const usePostAddToCart = () => {
  const cartCount = useCartCount();
  const setCartCount = useSetCartCount();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: postAddToCart,
    onSuccess: () => {
      const previousCartCount = cartCount;
      setCartCount(previousCartCount + 1);
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
  });
};

export const useGetCartInfo = () =>
  useQuery({
    queryKey: ["cartInfo"],
    queryFn: getCartInfo,
    retry: 3,
  });
