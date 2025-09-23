import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ShopingCartCard from "./ShopingCartCard";
import ShoppingCartFooter from "./ShoppingCartFooter";
import type { CartItem } from "../types";

interface ShopingCartGridProps {
  isEmpty?: boolean;
  cartItems: CartItem[];
  cartTotal?: number;
  onClearCart?: () => void;
  onRemoveItem?: (productId: number) => void;
  onDecrease?: (productId: number) => void;
  onIncrease?: (productId: number) => void;
  onInput?: (value: number, productId: number) => void;
}

const ShopingCartGrid = ({
  isEmpty = true,
  cartItems = [],
  cartTotal = 0,
  onClearCart,
  onRemoveItem,
  onDecrease,
  onIncrease,
  onInput,
}: ShopingCartGridProps) => {
  const navigate = useNavigate();

  return (
    <>
      {isEmpty ? (
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Descubre nuestros productos y encuentra lo que necesitas
            </p>
            <Button onClick={() => navigate("/products")} className="h-12 px-8">
              Explorar productos
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <ShopingCartCard
                key={index}
                item={item}
                onRemoveItem={onRemoveItem}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                onInput={onInput}
              />
            ))}
          </div>

          <ShoppingCartFooter
            displayTotal={cartTotal}
            onClear={onClearCart}
            onCheckout={() => navigate("/checkout")}
          />
        </div>
      )}
    </>
  );
};

export default ShopingCartGrid;
