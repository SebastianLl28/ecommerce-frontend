import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderShoppingCartProps {
  displayCount?: number;
  isEmpty?: boolean;
}

const HeaderShoppingCart = ({
  displayCount = 0,
  isEmpty = true,
}: HeaderShoppingCartProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl">
          <ShoppingBag className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Carrito de compras
          </h1>
          {!isEmpty && (
            <p className="text-sm text-gray-600 mt-1">
              {displayCount} {displayCount === 1 ? "producto" : "productos"}
            </p>
          )}
        </div>
      </div>

      <Button
        variant="link"
        className="gap-2 h-12 px-6 text-sm font-medium border-gray-300 hover:bg-gray-50 self-start sm:self-auto cursor-pointer"
        onClick={() => navigate("/products")}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Seguir comprando</span>
        <span className="sm:hidden">Volver</span>
      </Button>
    </div>
  );
};

export default HeaderShoppingCart;
