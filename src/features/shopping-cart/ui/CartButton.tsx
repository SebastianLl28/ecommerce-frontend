// features/shopping-cart/ui/CartButton.tsx
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { CartButtonProps } from "../types";

export function CartButton({ count = 0, onClick }: CartButtonProps) {
  // cap visual (99+)
  const displayCount = count > 99 ? "99+" : String(count);

  return (
    <Button
      onClick={onClick}
      size="lg"
      className="relative gap-2 font-semibold h-11 px-4"
      aria-label={`Ver carrito (${displayCount})`}
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Ver Carrito</span>

      {/* Badge */}
      <span
        className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 
                   rounded-full bg-primary text-primary-foreground 
                   text-[11px] leading-[22px] text-center font-bold shadow-sm"
      >
        {displayCount}
      </span>
    </Button>
  );
}
