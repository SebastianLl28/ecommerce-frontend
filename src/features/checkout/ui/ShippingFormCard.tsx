import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";

export type ShippingFormValues = {
  shippingAddress: string;
  phoneNumber: string;
  notes?: string;
};

type ShippingFormCardProps = {
  initialValues?: Partial<ShippingFormValues>;
  onChange?: (v: ShippingFormValues) => void;
};

const defaultValues: ShippingFormValues = {
  shippingAddress: "",
  phoneNumber: "",
  notes: "",
};

export default function ShippingFormCard({
  initialValues,
  onChange,
}: ShippingFormCardProps) {
  const [values, setValues] = useState<ShippingFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  useEffect(() => {
    onChange?.(values);
  }, [values, onChange]);

  const handleChange =
    (field: keyof ShippingFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((s) => ({ ...s, [field]: e.target.value }));
    };

  return (
    <Card className="rounded-xl">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <NotebookPen className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Datos de envío</h3>
            <p className="text-sm text-muted-foreground">
              Completa la dirección y el teléfono de entrega.
            </p>
          </div>
        </div>

        {/* Campos */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="shippingAddress">Dirección</Label>
            <Input
              id="shippingAddress"
              placeholder="Av. Principal 123, Lima"
              value={values.shippingAddress}
              onChange={handleChange("shippingAddress")}
              className="h-11"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Teléfono</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+51 987654321"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              className="h-11"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Ej.: Entregar después de las 5pm"
              value={values.notes}
              onChange={handleChange("notes")}
              className="min-h-[96px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
