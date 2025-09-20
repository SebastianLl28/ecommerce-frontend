import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CartButton } from "@/features/shopping-cart/ui/CartButton";
import { useGetProducts } from "../hooks";
import { FiltersPanel } from "../ui/FiltersPanel";
import { ProductsGrid } from "../ui/ProductsGrid";

const categories = [
  { id:1, name:"Computadoras" }, { id:2, name:"Periféricos" },
  { id:3, name:"Audio" }, { id:4, name:"Video" },
];

export default function ProductsPage() {
  const { data = [], isLoading, isError } = useGetProducts();
  const [cartCount, setCartCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const addToCart = () => setCartCount(c => c + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Productos</h1>

          {/* Botón Filtros (mobile) */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600"
          >
            <SlidersHorizontal size={18} />
            Filtros
          </button>

          <CartButton count={cartCount}/>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 pt-8 pb-16">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar sticky (desktop) */}
          <div className="hidden lg:block">
            <FiltersPanel categories={categories}/>
          </div>

          {/* Grid */}
          <section>
            {isError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
                No se pudieron cargar los productos. Intenta de nuevo.
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
                {Array.from({length:12}).map((_,i)=>(
                  <div key={i} className="h-80 bg-white rounded-xl shadow-sm animate-pulse"/>
                ))}
              </div>
            ) : (
              <ProductsGrid items={data} onAdd={addToCart}/>
            )}
          </section>
        </div>
      </div>

      {/* OFF-CANVAS Filters (mobile) */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <button
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-black/30"
            aria-label="Cerrar filtros"
          />
          {/* Panel */}
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-[360px] bg-white shadow-xl p-6
                          animate-[slideIn_.2s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filtros</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="px-3 py-1.5 rounded-md border border-gray-200 text-gray-700"
              >
                Cerrar
              </button>
            </div>
            <FiltersPanel categories={categories}/>
          </div>
        </div>
      )}
    </div>
  );
}
