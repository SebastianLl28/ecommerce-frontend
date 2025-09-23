import type { Response } from "@/types/apiTypes";
import type { CartItem } from "../shopping-cart/types";

interface OrderRequest {
  cartItems: CartItem[];
  shippingAddress: string;
  phoneNumber: string;
  notes: string;
}

interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  orderDate: string; // ISO date string
  shippingAddress: string;
  phoneNumber: string;
  notes?: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  subtotal: number;
  unitPrice: number;
}

type OrderResponse = Response<Order>;

export type { OrderRequest, OrderResponse, OrderItem, Order };
