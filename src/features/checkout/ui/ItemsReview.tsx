import { Card, CardContent } from "@/components/ui/card";
import type { CartItem } from "@/features/shopping-cart/types";

function money(v: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(v);
}

interface ItemsReviewProps {
  items: CartItem[];
}

export default function ItemsReview({ items }: ItemsReviewProps) {
  return (
    <Card className="rounded-xl">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Productos</h3>
        <div className="space-y-3">
          {items.map((it) => (
            <div
              key={it.productId}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border p-3"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{it.productName}</p>
                <p className="text-sm text-muted-foreground">
                  x{it.quantity} · {money(it.productPrice)} c/u
                </p>
              </div>
              <span className="text-sm text-muted-foreground tabular-nums">
                Cant: {it.quantity}
              </span>
              <div className="text-right font-semibold tabular-nums">
                {money(it.quantity * it.productPrice)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
