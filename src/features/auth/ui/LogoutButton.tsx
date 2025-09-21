import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { usePostLogout } from "../hooks";

const LogoutButton = () => {
  const { mutate: logout } = usePostLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={handleLogout}
      className="transition-transform font-semibold hover:-translate-y-0.5"
    >
      <LogOut className="mr-2" />
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
