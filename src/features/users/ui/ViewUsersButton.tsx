import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function ViewUsersButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 h-11 px-4"
      onClick={onClick}
    >
      <Users className="h-4 w-4" />
      Ver Usuarios
    </Button>
  );
}
