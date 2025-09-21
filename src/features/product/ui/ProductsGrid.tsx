import type { PaginatedResponse } from "@/types/apiTypes";
import type { IProduct } from "../types";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({
  items,
  onAdd,
}: {
  items: PaginatedResponse<IProduct>;
  onAdd: (p: IProduct) => void;
}) {
  if (items.empty) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div
      role="list"
      className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 md:gap-8 items-stretch content-start"
    >
      {items.content.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
