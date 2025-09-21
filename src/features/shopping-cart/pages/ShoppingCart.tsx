import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { money } from "@/lib/utils";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

// Mock data
const cartMockItems = [
  { id: 1, name: "Trek Marlin 7", unitPrice: 2800, qty: 8, subtotal: 22400 },
  { id: 2, name: "Scott Aspect 950", unitPrice: 3500, qty: 4, subtotal: 14000 },
  { id: 3, name: "Specialized Allez", unitPrice: 4500, qty: 2, subtotal: 9000 },
];

// Componente QtyStepper mejorado
const QtyStepper = ({
  value,
  onDecrease,
  onIncrease,
  onInput,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg bg-white ${className}`}
    >
      <button
        onClick={onDecrease}
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-l-lg transition-colors"
        disabled={value <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={onInput}
        className="w-16 h-10 text-center border-0 focus:outline-none focus:ring-0 bg-transparent font-medium"
        min="1"
      />
      <button
        onClick={onIncrease}
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-r-lg transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default function ShoppingCartPage({
  items,
  total,
  itemCount,
  onBack = () => {},
  onUpdateItem = () => {},
  onRemoveItem = () => {},
  onClear = () => {},
  onCheckout = () => {},
}) {
  const list = items ?? cartMockItems;
  const computedTotal = list.reduce((a, it) => a + it.subtotal, 0);
  const computedCount = list.reduce((a, it) => a + it.qty, 0);
  const displayTotal = total ?? computedTotal;
  const displayCount = itemCount ?? computedCount;
  const isEmpty = list.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Container principal con padding siguiendo regla de 8px */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-8 pb-24">
        {/* Header responsive */}
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
            variant="outline"
            onClick={onBack}
            className="gap-2 h-12 px-6 text-sm font-medium border-gray-300 hover:bg-gray-50 self-start sm:self-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Seguir comprando</span>
            <span className="sm:hidden">Volver</span>
          </Button>
        </div>

        {isEmpty ? (
          // Estado vacío mejorado
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Descubre nuestros productos y encuentra lo que necesitas
              </p>
              <Button onClick={onBack} className="h-12 px-8">
                Explorar productos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Lista de productos */}
            <div className="space-y-4">
              {list.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-6">
                    {/* Layout mobile-first */}
                    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-8">
                      {/* Información del producto */}
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-emerald-600 font-medium">
                          {money(item.unitPrice)} c/u
                        </p>
                      </div>

                      {/* Controles de cantidad - responsive */}
                      <div className="flex items-center justify-between lg:justify-center gap-4">
                        <div className="lg:hidden">
                          <p className="text-sm text-gray-600">Cantidad</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <QtyStepper
                            value={item.qty}
                            onDecrease={() => {}}
                            onIncrease={() => {}}
                            onInput={() => {}}
                            className="w-36"
                          />
                          <Button
                            size="sm"
                            className="h-10 px-4 "
                            onClick={() => onUpdateItem(item.id)}
                          >
                            <span className="hidden sm:inline">Actualizar</span>
                            <span className="sm:hidden">OK</span>
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal y eliminar */}
                      <div className="flex items-center justify-between lg:justify-end lg:gap-4">
                        <div className="text-left lg:text-right">
                          <p className="text-xl font-bold text-gray-900">
                            {money(item.subtotal)}
                          </p>
                          <p className="text-sm text-gray-500">Subtotal</p>
                        </div>

                        <Button
                          size="icon"
                          variant="outline"
                          className="h-12 w-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumen y acciones */}
            <div className="space-y-4">
              {/* Card de total */}
              <Card className="rounded-2xl border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  {/* Total */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-gray-900">
                      {money(displayTotal)}
                    </span>
                  </div>

                  <Separator className="mb-8" />

                  {/* Botones de acción - responsive */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={onClear}
                      className="h-12 px-6 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 order-2 sm:order-1"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Vaciar carrito
                    </Button>

                    <Button
                      onClick={onCheckout}
                      className="h-12 px-8 flex-1 text-base font-medium order-1 sm:order-2"
                    >
                      Proceder al checkout
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
