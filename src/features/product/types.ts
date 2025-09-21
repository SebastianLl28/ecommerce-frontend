import type { PaginatedResponse, Response } from "@/types/apiTypes";

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId?: number;
}

interface ICategory {
  id: number;
  name: string;
}

type ProductResponse = Response<PaginatedResponse<IProduct>>;

export type { IProduct, ICategory, ProductResponse };
