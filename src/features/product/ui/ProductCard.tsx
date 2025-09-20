import type { IProduct } from "../types";

export function ProductCard({ product, onAdd }: { product: IProduct; onAdd:(p:IProduct)=>void }) {
  return (
    <article
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300 flex flex-col min-w-[240px]"
    >
      {/* Imagen con padding 16px */}
      <div className="p-4 bg-white">
        <img
          src={product.image || "/api/placeholder/400/200"}
          alt={product.name}
          className="w-full h-48 object-contain"
        />
      </div>

      {/* Contenido con padding 24px */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Bloque de precio + stock, separación vertical 8px */}
        <div className="space-y-2 mb-4">
          <div className="text-2xl font-bold text-emerald-600">
            S/ {product.price.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">
            Stock: {product.stock} unidades
          </div>
        </div>

        {/* Botón con padding vertical 12px (3 = 12px) y horizontal 16px */}
        <button
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold uppercase tracking-wide transition-all ${
            product.stock > 0
              ? "bg-teal-700 hover:bg-teal-600 text-white hover:-translate-y-0.5"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
        </button>
      </div>
    </article>
  );
}
