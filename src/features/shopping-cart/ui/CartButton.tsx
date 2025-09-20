import { ShoppingCart } from 'lucide-react';

export function CartButton({ count = 0, onClick }: { count?: number; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="relative bg-teal-700 hover:bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold
                 transition-all hover:-translate-y-0.5 flex items-center gap-2">
      <ShoppingCart size={18} />
      <span>Ver Carrito</span>
      <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-sm">{count}</span>
    </button>
  );
}
