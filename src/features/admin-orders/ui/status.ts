export const ORDER_STATUS = [
  { code: "PENDING", label: "Pendiente", badge: "secondary" },
  { code: "CONFIRMED", label: "Confirmada", badge: "secondary" },
  { code: "PROCESSING", label: "En Proceso", badge: "secondary" },
  { code: "SHIPPED", label: "Enviada", badge: "default" },
  { code: "DELIVERED", label: "Entregada", badge: "default" },
  { code: "CANCELLED", label: "Cancelada", badge: "destructive" },
] as const;

export const statusLabel = (code: string) =>
  ORDER_STATUS.find((s) => s.code === code)?.label ?? code;

export const statusBadgeVariant = (code: string) =>
  ORDER_STATUS.find((s) => s.code === code)?.badge as
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | undefined;
