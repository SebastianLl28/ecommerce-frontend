// features/orders/ui/ViewOrdersButton.tsx
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";

export function ViewOrdersButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 h-11 px-4"
      onClick={onClick}
    >
      <Receipt className="h-4 w-4" />
      Ver Compras
    </Button>
  );
}
