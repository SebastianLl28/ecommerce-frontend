import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrder, getOrders, postOrder } from "./api";
import { useNavigate } from "react-router-dom";
import { useDeleteCartItems } from "../shopping-cart/hooks";
import { toast } from "sonner";
import JSConfetti from "js-confetti";

export const usePostOrder = () => {
  const navigate = useNavigate();
  const { mutate: deleteCartItems } = useDeleteCartItems();
  return useMutation({
    mutationKey: ["post-order"],
    mutationFn: postOrder,
    onSuccess: (data) => {
      toast.success(data.message);
      if (data.success && data.data) {
        const { id } = data.data;
        navigate(`/orders/success/${id}`);
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        deleteCartItems();
      }
    },
  });
};

export const useGetOrder = (id: number) =>
  useQuery({
    queryKey: ["get-order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });

export const useGetOrders = () =>
  useQuery({
    queryKey: ["get-orders"],
    queryFn: getOrders,
  });
