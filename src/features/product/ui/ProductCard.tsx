import { Button } from "@/components/ui/button";
import type { IProduct } from "../types";

export function ProductCard({
  product,
  onAdd,
}: {
  product: IProduct;
  onAdd: (p: IProduct) => void;
}) {
  return (
    <article
      className="bg-white rounded-xl overflow-hidden shadow-sm 
                 hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300 flex flex-col min-w-[240px]"
    >
      {/* Imagen con padding 16px */}
      <div className="p-4 bg-white flex items-center justify-center">
        <div className="w-full h-56 flex items-center justify-center">
          <img
            src={product.imageUrl || "/api/placeholder/400/200"}
            alt={product.name}
            className="max-h-full object-contain"
          />
        </div>
      </div>

      {/* Contenido con padding 16px */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Bloque de precio + stock con spacing 8px */}
        <div className="space-y-2 mb-4">
          <div className="text-2xl font-bold text-emerald-600">
            S/ {product.price.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">
            Stock: {product.stock} unidades
          </div>
        </div>

        <Button
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
          className={`w-full h-12 rounded-lg font-semibold uppercase tracking-wide transition-all ${
            product.stock > 0
              ? "bg-teal-700 hover:bg-teal-600 text-white hover:-translate-y-0.5"
              : "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 hover:translate-y-0"
          }`}
        >
          {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
        </Button>
      </div>
    </article>
  );
}
