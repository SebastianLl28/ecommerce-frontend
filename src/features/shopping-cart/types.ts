import type { Response } from "@/types/apiTypes";

interface CartButtonProps {
  count?: number;
  onClick?: () => void;
}

interface CartItem {
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
}

type CartItemResponse = Response<CartItem[]>;

interface CartInfo {
  cartItems: CartItem[];
  totalItems: number;
  itemCount: number;
  message: string;
}

type CartInfoResponse = Response<CartInfo>;

interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export type {
  CartButtonProps,
  CartItem,
  CartItemResponse,
  CartInfoResponse,
  AddToCartRequest,
};
