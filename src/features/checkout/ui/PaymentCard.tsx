import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const methods = [
  {
    key: "card",
    label: "Tarjeta de crédito / débito",
    hint: "Visa, MasterCard, Amex",
  },
  { key: "cod", label: "Pago contra entrega", hint: "Efectivo / Yape / Plin" },
  {
    key: "bank",
    label: "Transferencia bancaria",
    hint: "BCP / Interbank / BBVA",
  },
];

export default function PaymentCard({ value = "card" }: { value?: string }) {
  return (
    <Card className="rounded-xl">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Método de pago</h3>
        <RadioGroup defaultValue={value} className="space-y-3">
          {methods.map((m) => (
            <div
              key={m.key}
              className="flex items-center gap-3 p-3 rounded-lg border"
            >
              <RadioGroupItem id={`pay-${m.key}`} value={m.key} />
              <Label htmlFor={`pay-${m.key}`} className="cursor-pointer">
                <div className="font-medium">{m.label}</div>
                <div className="text-sm text-muted-foreground">{m.hint}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
