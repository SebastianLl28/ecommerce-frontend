import { Card, CardContent } from "@/components/ui/card";
import { mockItems } from "@/config/constants";

function money(v: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(v);
}

type Item = { id: number; name: string; qty: number; unitPrice: number };

export default function ItemsReview({ items }: { items?: Item[] }) {
  const list = items?.length ? items : mockItems;

  return (
    <Card className="rounded-xl">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Productos</h3>
        <div className="space-y-3">
          {list.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border p-3"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{it.name}</p>
                <p className="text-sm text-muted-foreground">
                  x{it.qty} · {money(it.unitPrice)} c/u
                </p>
              </div>
              <span className="text-sm text-muted-foreground tabular-nums">
                Cant: {it.qty}
              </span>
              <div className="text-right font-semibold tabular-nums">
                {money(it.qty * it.unitPrice)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
