import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/utils";
import {
  useGetAdminOrder,
  useUpdateOrderStatus,
} from "@/features/admin-orders/hooks";
import { useGetUser } from "@/features/users/hooks";
import type { OrderStatus } from "../types";

export default function AdminOrderDetailDialog({
  open,
  onOpenChange,
  orderId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  orderId?: number;
}) {
  const { data: orderResp } = useGetAdminOrder(orderId ?? 0, {
    enabled: open && !!orderId,
  });
  const order = orderResp?.data;

  const { data: user, isFetching: loadingUser } = useGetUser(
    order?.userId ?? 0,
    {
      enabled: open && Boolean(order?.userId),
    }
  );

  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();
  const handleChangeStatus = (value: OrderStatus) => {
    if (!order) return;
    updateStatus({ id: order.id, status: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalle de orden #{order?.id}</DialogTitle>
        </DialogHeader>

        {!order ? (
          <div className="p-4 text-sm text-muted-foreground">Cargando…</div>
        ) : (
          <div className="space-y-4">
            {/* 16px entre bloques */}
            {/* Resumen superior */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Info
                label="Fecha"
                value={new Date(order.orderDate).toLocaleString()}
              />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Estado</p>
                <Select
                  defaultValue={order.status}
                  onValueChange={(v) => handleChangeStatus(v as OrderStatus)}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pendiente</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmada</SelectItem>
                    <SelectItem value="PROCESSING">En proceso</SelectItem>
                    <SelectItem value="SHIPPED">Enviada</SelectItem>
                    <SelectItem value="DELIVERED">Entregada</SelectItem>
                    <SelectItem value="CANCELLED">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Info label="Total" value={money(order.totalAmount)} />
            </div>

            <Separator />

            {/* Sección Cliente */}
            <section className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Cliente</h3>
              {loadingUser ? (
                <div className="grid gap-2 sm:grid-cols-3">
                  <SkeletonBar />
                  <SkeletonBar />
                  <SkeletonBar />
                  <SkeletonBar />
                  <SkeletonBar />
                  <SkeletonBar />
                </div>
              ) : (
                <div className="grid gap-4">
                  {/* Encabezado compacto */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Info
                      label="Nombre"
                      value={user?.fullName ?? `UID ${order.userId}`}
                    />
                    <Info label="Email" value={user?.email ?? "—"} />
                    <Info
                      label="Teléfono"
                      value={user?.phone ?? order.phoneNumber ?? "—"}
                    />
                  </div>

                  {/* Cuadrícula de detalles */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Info
                      label="Dirección"
                      value={user?.address ?? order.shippingAddress ?? "—"}
                    />
                    <Info label="Rol" value={user?.role ?? "—"} />
                    <Info
                      label="Estado"
                      value={user?.active ? "Activo" : "Inactivo"}
                    />
                    <Info
                      label="ID Usuario"
                      value={String(user?.id ?? order.userId)}
                    />
                    {/* Campos extra preparados para crecer */}
                    <Info label="Notas" value={order.notes || "—"} />
                    <div className="hidden sm:block" />
                  </div>
                </div>
              )}
            </section>

            {/* Items */}
            <section className="space-y-2">
              <p className="font-semibold">Ítems</p>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-muted-foreground">
                    <tr className="[&>th]:px-4 [&>th]:py-2 [&>th]:text-left">
                      <th>Producto</th>
                      <th className="w-[100px]">Cant.</th>
                      <th className="w-[140px]">Precio</th>
                      <th className="w-[140px]">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((it) => (
                      <tr key={it.id} className="border-t">
                        <td className="px-4 py-2">{it.productName}</td>
                        <td className="px-4 py-2 tabular-nums">
                          x{it.quantity}
                        </td>
                        <td className="px-4 py-2 tabular-nums">
                          {money(it.unitPrice)}
                        </td>
                        <td className="px-4 py-2 tabular-nums font-medium">
                          {money(it.subtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => onOpenChange(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** 8px-friendly key/value */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium break-words">{value}</p>
    </div>
  );
}

/** Skeleton a 8px (altura 20 ≈ 5*4px) */
function SkeletonBar() {
  return <div className="h-5 w-full rounded bg-muted animate-pulse" />;
}
