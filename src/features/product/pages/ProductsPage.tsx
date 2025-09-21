import MobileCartButton from "@/features/shopping-cart/ui/MobileCartButton";
import { categories } from "@/config/constants";
import { useCartCount } from "@/store/useCartStore";
import { usePostAddToCart } from "@/features/shopping-cart/hooks";
import { useGetProducts } from "../hooks";
import { FiltersPanel } from "../ui/FiltersPanel";
import { ProductsGrid } from "../ui/ProductsGrid";
import type { IProduct } from "../types";

export default function ProductsPage() {
  const { mutate } = usePostAddToCart();
  const { data, isLoading, isError, isSuccess } = useGetProducts();
  const cartCount = useCartCount();

  const addToCart = (product: IProduct) => {
    mutate({ productId: product.id, quantity: 1 });
  };

  return (
    <div className="max-w-[1800px] mx-auto px-8 pt-8 pb-16">
      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        <div className="hidden lg:block">
          <FiltersPanel categories={categories} />
        </div>

        <section>
          {isError && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
              No se pudieron cargar los productos. Intenta de nuevo.
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-white rounded-xl shadow-sm animate-pulse"
                />
              ))}
            </div>
          )}

          {isSuccess && <ProductsGrid items={data.data!} onAdd={addToCart} />}
        </section>
      </div>

      <div className="lg:hidden">
        <MobileCartButton count={cartCount} />
      </div>
    </div>
  );
}
