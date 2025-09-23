import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockTotals } from "@/config/constants";
import { money } from "@/lib/utils";

type Totals = {
  itemCount: number;
  subTotal: number;
  shipping?: number;
  discount?: number;
  taxes?: number;
};

interface OrderSummaryProps {
  totals?: Partial<Totals>;
  onPlaceOrder?: () => void;
}

export default function OrderSummary({
  totals,
  onPlaceOrder,
}: OrderSummaryProps) {
  const t = { ...mockTotals, ...totals };

  return (
    <Card className="rounded-xl">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Resumen</h3>

        <div className="space-y-2 text-sm">
          <Row
            label={`Subtotal (${t.itemCount} ítems)`}
            value={money(t.subTotal)}
          />
          {!!t.discount && (
            <Row label="Descuento" value={`- ${money(t.discount)}`} />
          )}
          {!!t.taxes && <Row label="Impuestos" value={money(t.taxes)} />}
          <Row label="Envío" value="Gratis" />
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Total a pagar</span>
          <span className="text-2xl font-extrabold tabular-nums">
            {money(t.subTotal)}
          </span>
        </div>

        <Button className="w-full h-12" onClick={onPlaceOrder}>
          Confirmar y pagar
        </Button>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}
