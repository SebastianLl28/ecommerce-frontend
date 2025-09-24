export type AdminOrderItem = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type AdminOrderRow = {
  id: number;
  userId: number;
  totalAmount: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";
  orderDate: string; // ISO
  shippingAddress: string;
  phoneNumber: string;
  notes: string;
  orderItems: AdminOrderItem[];
};

export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItemDTO {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderDTO {
  id: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  shippingAddress: string;
  phoneNumber: string;
  notes: string;
  orderItems: OrderItemDTO[];
}
