import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";

export function ViewProductsButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 h-11 px-4"
      onClick={onClick}
    >
      <Boxes className="h-4 w-4" />
      Ver Productos
    </Button>
  );
}
