import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { money } from "@/lib/utils";
import { ArrowLeft, Trash2 } from "lucide-react";

interface ShoppingCartFooterProps {
  displayTotal?: number;
  onClear?: () => void;
  onCheckout?: () => void;
}

const ShoppingCartFooter = ({
  displayTotal = 0,
  onClear,
  onCheckout,
}: ShoppingCartFooterProps) => {
  return (
    <div className="space-y-4">
      <Card className="rounded-2xl border-0 shadow-lg bg-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-semibold text-gray-900">Total</span>
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
  );
};

export default ShoppingCartFooter;
