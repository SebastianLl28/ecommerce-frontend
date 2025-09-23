import { CheckCircle2, ArrowRight, Package, Receipt, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetOrder } from "../hooks";
import { money } from "@/lib/utils";

// --- mocks para que rinda sin props ---
const mockOrder = {
  id: "ORD-2025-000123",
  date: new Date().toISOString(),
  eta: "3–5 días hábiles",
  total: 45400,
  items: [
    { id: 1, name: "Trek Marlin 7", qty: 1, unitPrice: 2800 },
    { id: 2, name: "Scott Aspect 950", qty: 1, unitPrice: 3500 },
  ],
};

type OrderItem = { id: number; name: string; qty: number; unitPrice: number };
type OrderInfo = {
  id: string;
  date: string;
  eta?: string;
  total: number;
  items: OrderItem[];
};

interface OrderSuccessPageProps {
  order?: Partial<OrderInfo>;
}

export default function OrderSuccessPage({ order }: OrderSuccessPageProps) {
  const o = { ...mockOrder, ...order };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/orders");
    }
  }, [id, navigate]);

  const {
    data: orderResponse,
    isSuccess,
    isLoading,
  } = useGetOrder(Number(id) || 0);

  const onGoOrders = () => navigate("/orders");
  const onGoHome = () => navigate("/products");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando detalles...</p>
      </div>
    );
  }

  const orderId = orderResponse?.data?.id || 0;
  const formattedOrderId = `ORD-${String(orderId).padStart(8, "0")}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-8 pt-12 pb-16">
        {/* Header de éxito */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold">¡Compra confirmada!</h1>
        </div>

        <Card className="rounded-xl">
          <CardContent className="p-6 space-y-6">
            {/* Resumen arriba */}
            <div className="grid sm:grid-cols-3 gap-6">
              <Info label="N.º de pedido" value={formattedOrderId} />
              <Info
                label="Fecha"
                value={new Date(
                  orderResponse?.data?.orderDate || o.date
                ).toLocaleString()}
              />
              <Info label="Entrega estimada" value={o.eta ?? "Por confirmar"} />
            </div>

            <Separator />

            {/* Items */}
            <div className="space-y-3">
              {orderResponse &&
                isSuccess &&
                orderResponse.data?.orderItems.map((it) => (
                  <div
                    key={it.id}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-4 p-3 rounded-lg border"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{it.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        x{it.quantity} · {money(it.unitPrice)} c/u
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Cant: {it.quantity}
                    </span>
                    <div className="text-right font-semibold tabular-nums">
                      {money(it.subtotal)}
                    </div>
                  </div>
                ))}
            </div>

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold">Total pagado</span>
              <span className="text-2xl font-extrabold tabular-nums">
                {money(orderResponse?.data?.totalAmount || 0)}
              </span>
            </div>

            {/* Acciones */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <Button
                variant="secondary"
                className="h-11 gap-2"
                onClick={onGoOrders}
              >
                <Receipt className="h-4 w-4" />
                Ver mis pedidos
              </Button>
              <Button className="h-11 gap-2" onClick={onGoHome}>
                Seguir comprando <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Nota */}
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Package className="h-4 w-4 mt-0.5" />
              <p>
                Te enviaremos actualizaciones del envío por correo. También
                puedes revisar el estado en “Mis pedidos”.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Enlaces rápidos */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="ghost" className="gap-2" onClick={onGoOrders}>
            <Receipt className="h-4 w-4" /> Ir a mis pedidos
          </Button>
          <Button variant="ghost" className="gap-2" onClick={onGoHome}>
            <Home className="h-4 w-4" /> Inicio / Productos
          </Button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium tabular-nums">{value}</p>
    </div>
  );
}
