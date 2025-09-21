import { Card, CardContent } from "@/components/ui/card";
import { money } from "@/lib/utils";
import QtyStepper from "./QtyStepper";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../types";

interface ShopingCartCardProps {
  item: CartItem;
  onRemoveItem?: (id: number) => void;
  onDecrease?: (productId: number) => void;
  onIncrease?: (productId: number) => void;
  onInput?: (value: number, productId: number) => void;
}

const ShopingCartCard = ({
  item,
  onRemoveItem,
  onDecrease,
  onIncrease,
  onInput,
}: ShopingCartCardProps) => {
  return (
    <Card className="rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-[1fr_260px_auto] lg:items-center lg:gap-8">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
              {item.productName}
            </h3>
            <p className="text-emerald-600 font-medium tabular-nums">
              {money(item.productPrice)} c/u
            </p>
          </div>

          <div className="flex items-center justify-between lg:justify-center gap-4 w-full lg:w-[260px]">
            <div className="lg:hidden">
              <p className="text-sm text-gray-600">Cantidad</p>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <QtyStepper
                value={item.quantity}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                onInput={onInput}
                productId={item.productId}
              />
              {/* <Button
                size="sm"
                className="h-10 px-4 min-w-[120px]"
                onClick={() => onUpdateItem?.(item.productId)}
              >
                <span className="hidden sm:inline">Actualizar</span>
                <span className="sm:hidden">OK</span>
              </Button> */}
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end lg:gap-4 w-full ml-auto lg:min-w-48">
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
              onClick={() => onRemoveItem?.(item.productId)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopingCartCard;
