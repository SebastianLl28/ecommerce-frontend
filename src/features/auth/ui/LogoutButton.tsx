import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de cierre de sesión
    navigate("/");
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
