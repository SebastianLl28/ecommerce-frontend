import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCartItem,
  deleteCartItems,
  getCartInfo,
  getCartItems,
  postAddToCart,
  postUpdateCartItem,
} from "./api";
import { useCartCount, useSetCartCount } from "@/store/useCartStore";
import { toast } from "sonner";

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

export const useDeleteCartItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["clearCart"],
    mutationFn: deleteCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateCartItem"],
    mutationFn: postUpdateCartItem,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });
};
