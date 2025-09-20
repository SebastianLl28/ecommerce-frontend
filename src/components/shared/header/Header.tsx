import { CartButton } from "@/features/shopping-cart/ui/CartButton";
import { useCartCount } from "@/store/useCartStore";
import ButtonFilter from "../filter/ui/ButtonFilter";
import LogoutButton from "@/features/auth/ui/LogoutButton";

const Header = () => {
  const cartCount = useCartCount();

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Productos</h1>

        <div className="lg:hidden">
          <ButtonFilter />
        </div>

        <div className="space-x-4">
          <div className="hidden lg:inline-block">
            <CartButton count={cartCount} />
          </div>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
