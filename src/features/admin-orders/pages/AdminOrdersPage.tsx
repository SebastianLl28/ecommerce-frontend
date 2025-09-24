import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PackageSearch, RefreshCw, Eye } from "lucide-react";
import { useGetAdminOrders } from "../hooks"; // adapta import
import OrderDetailDialog from "../ui/OrderDetailDialog";
// import OrderDetailDialog from "../ui/OrderDetailDialog"; // componente de abajo

const STATUS = [
  { value: "ALL", label: "Todos" },
  { value: "PENDING", label: "Pendiente" },
  { value: "CONFIRMED", label: "Confirmada" },
  { value: "PROCESSING", label: "En Proceso" },
  { value: "SHIPPED", label: "Enviada" },
  { value: "DELIVERED", label: "Entregada" },
  { value: "CANCELLED", label: "Cancelada" },
];

const money = (v: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    v
  );

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function AdminOrdersPage() {
  const [status, setStatus] = useState<string>("ALL");
  const [openId, setOpenId] = useState<number | null>(null);

  const { data, isLoading, refetch, isError } = useGetAdminOrders({
    status: status === "ALL" ? undefined : status,
    page: 0,
    size: 99999, // listar todo
  });

  const list = useMemo(() => data?.data?.content ?? [], [data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <PackageSearch className="h-5 w-5 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold">Órdenes (Admin)</h1>
          </div>

          <div className="flex items-center gap-3">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {STATUS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
              Refrescar
            </Button>
          </div>
        </div>

        {/* Estados */}
        {isLoading && (
          <Card className="rounded-xl mb-6">
            <CardContent className="p-6 text-sm text-muted-foreground">
              Cargando órdenes…
            </CardContent>
          </Card>
        )}
        {isError && !isLoading && (
          <Card className="rounded-xl mb-6">
            <CardContent className="p-6 text-sm text-red-600">
              No se pudieron cargar las órdenes.
            </CardContent>
          </Card>
        )}

        {/* Tabla */}
        {!isLoading && !isError && (
          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr className="[&>th]:text-left [&>th]:font-semibold [&>th]:px-4 [&>th]:py-3">
                  <th className="w-[80px]">ID</th>
                  <th className="min-w-[220px]">Fecha</th>
                  <th className="w-[160px]">Estado</th>
                  <th className="w-[140px]">Total</th>
                  <th>Ítems</th>
                  <th className="w-[140px]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-muted-foreground"
                    >
                      No hay órdenes para mostrar.
                    </td>
                  </tr>
                )}
                {list.map((o: any) => (
                  <tr key={o.id} className="border-t align-top">
                    <td className="px-4 py-3 tabular-nums">{o.id}</td>
                    <td className="px-4 py-3">{fmtDate(o.orderDate)}</td>
                    <td className="px-4 py-3">
                      {/* etiqueta simple */}
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                        {STATUS.find((s) => s.value === o.status)?.label ??
                          o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {money(o.totalAmount)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        {o.orderItems.map((it: any) => (
                          <div key={it.id} className="text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {it.productName}
                            </span>{" "}
                            <span>
                              · x{it.quantity} · {money(it.unitPrice)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => setOpenId(o.id)}
                      >
                        <Eye className="h-4 w-4" />
                        Ver detalle
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">
          Tip: usa el filtro de estado para encontrar más rápido. El cambio de
          estado se realiza dentro del detalle.
        </p>

        {/* Modal de detalle */}
        <OrderDetailDialog
          orderId={openId}
          open={openId !== null}
          onOpenChange={(v) => !v && setOpenId(null)}
          onChanged={() => {
            // después de actualizar estatus, refrescamos la lista
            refetch();
          }}
        />
      </div>
    </div>
  );
}
