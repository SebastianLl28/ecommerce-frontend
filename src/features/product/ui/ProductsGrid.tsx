import type { IProduct } from "../types";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({ items, onAdd }:{ items: IProduct[]; onAdd:(p:IProduct)=>void }) {
  if (!items.length) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="
      grid grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-3
      2xl:grid-cols-4
      gap-8
    ">
      {items.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
    </div>
  );
}
