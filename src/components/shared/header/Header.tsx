// components/shared/header/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CartButton } from "@/features/shopping-cart/ui/CartButton";
import { ViewOrdersButton } from "@/features/orders/ui/ViewOrdersButton";
import { ViewUsersButton } from "@/features/users/ui/ViewUsersButton";
import { ViewAdminOrdersButton } from "@/features/admin-orders/ui/ViewAdminOrdersButton";
import { useCartCount, useSetCartCount } from "@/store/useCartStore";
import LogoutButton from "@/features/auth/ui/LogoutButton";
import { useGetCartInfo } from "@/features/shopping-cart/hooks";
import ButtonFilter from "../filter/ui/ButtonFilter";
import { useUser } from "@/store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const setCartCount = useSetCartCount();
  const { data: cartInfo, isSuccess } = useGetCartInfo();

  const user = useUser();

  useEffect(() => {
    if (isSuccess && cartInfo?.success) {
      setCartCount(cartInfo.data!.itemCount);
    }
  }, [cartInfo, isSuccess, setCartCount]);

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between gap-4">
        <Link to="/products" className="text-lg font-bold">
          <h1 className="text-xl font-semibold text-gray-800">Mundo Vici</h1>
        </Link>

        {/* Filtro solo en mobile */}
        <div className="lg:hidden">
          <ButtonFilter />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Visible para todos */}
          <ViewOrdersButton onClick={() => navigate("/orders")} />

          {/* Solo para ADMIN */}
          {user?.role === "ADMIN" && (
            <>
              <ViewUsersButton onClick={() => navigate("/users")} />
              <ViewAdminOrdersButton
                onClick={() => navigate("/admin-orders")}
              />
            </>
          )}

          <div className="hidden lg:block">
            <CartButton
              count={cartCount}
              onClick={() => navigate("/shopping-cart")}
            />
          </div>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
