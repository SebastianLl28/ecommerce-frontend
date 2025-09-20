import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { CartButtonProps } from "../types";

export function CartButton({ count = 0, onClick }: CartButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="xl"
      className="relative flex items-center gap-2 font-semibold hover:-translate-y-0.5 transition-transform"
    >
      <ShoppingCart size={18} />
      <span>Ver Carrito</span>
      <span className="ml-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-sm">
        {count}
      </span>
    </Button>
  );
}
