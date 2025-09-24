import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";

export function ViewAdminOrdersButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 h-11 px-4"
      onClick={onClick}
    >
      <PackageSearch className="h-4 w-4" />
      Ver Órdenes (Admin)
    </Button>
  );
}
