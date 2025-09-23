import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Package, Filter } from "lucide-react";

// --- mocks para render sin props ---
const mockOrders = [
  {
    id: "ORD-2025-000123",
    date: "2025-09-20T12:30:00Z",
    items: 3,
    total: 45400,
    status: "En preparación",
  },
  {
    id: "ORD-2025-000122",
    date: "2025-09-10T09:15:00Z",
    items: 1,
    total: 3500,
    status: "Entregado",
  },
  {
    id: "ORD-2025-000121",
    date: "2025-08-28T18:45:00Z",
    items: 2,
    total: 5600,
    status: "En tránsito",
  },
];
const money = (v: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    v
  );

type OrderRow = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: string;
};

export default function OrdersListPage({
  orders,
  onView,
  onFilter,
}: {
  orders?: OrderRow[];
  onView?: (id: string) => void;
  onFilter?: () => void;
}) {
  const list = orders?.length ? orders : mockOrders;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold">Mis pedidos</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={onFilter}>
              <Filter className="h-4 w-4" /> Filtros
            </Button>
          </div>
        </div>

        {/* Buscador simple (UI) */}
        <Card className="rounded-xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Buscar por N.º de pedido…"
                  className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button className="h-10">Buscar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla simple responsiva */}
        <div className="space-y-4">
          {list.map((o) => (
            <Card key={o.id} className="rounded-xl">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{o.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(o.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Ítems: <span className="font-medium">{o.items}</span>
                  </div>
                  <div className="font-semibold tabular-nums">
                    {money(o.total)}
                  </div>
                  <div>
                    <Badge variant="secondary">{o.status}</Badge>
                  </div>

                  <div className="flex justify-start sm:justify-end">
                    <Button
                      size="sm"
                      className="gap-2 min-w-[120px]"
                      onClick={() => onView?.(o.id)}
                    >
                      <Eye className="h-4 w-4" /> Ver detalle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pie / separación */}
        <Separator className="my-8" />
        <div className="text-sm text-muted-foreground">
          ¿No encuentras un pedido? Puede tardar unos minutos en aparecer
          después del pago.
        </div>
      </div>
    </div>
  );
}
