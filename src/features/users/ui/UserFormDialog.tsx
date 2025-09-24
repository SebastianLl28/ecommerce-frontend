// features/users/ui/UserFormDialog.tsx
import { useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { UserDTO } from "../types";

const schema = z.object({
  firstName: z.string().min(1, "Requerido"),
  lastName: z.string().min(1, "Requerido"),
  // email: z.string().email("Email inválido"),
  email: z.email("Email inválido"),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["ADMIN", "CUSTOMER"]),
  active: z.boolean().default(true),
});
type FormValues = z.infer<typeof schema>;

export default function UserFormDialog({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultValues?: Partial<UserDTO>;
  onSubmit: (values: FormValues) => void;
  loading?: boolean;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      address: defaultValues?.address ?? "",
      role: (defaultValues?.role as "ADMIN" | "CUSTOMER") ?? "CUSTOMER",
      active: defaultValues?.active ?? true,
    },
  });

  // 👇 resetea el form cuando cambie defaultValues o se abra/cierre
  useEffect(() => {
    form.reset({
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      address: defaultValues?.address ?? "",
      role: (defaultValues?.role as "ADMIN" | "CUSTOMER") ?? "CUSTOMER",
      active: defaultValues?.active ?? true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, open]);

  const submit = form.handleSubmit(onSubmit);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id ? "Editar usuario" : "Nuevo usuario"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Nombre</Label>
              <Input {...form.register("firstName")} />
              <p className="text-xs text-red-600">
                {form.formState.errors.firstName?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Apellido</Label>
              <Input {...form.register("lastName")} />
              <p className="text-xs text-red-600">
                {form.formState.errors.lastName?.message}
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" {...form.register("email")} />
            <p className="text-xs text-red-600">
              {form.formState.errors.email?.message}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Teléfono</Label>
              <Input {...form.register("phone")} />
            </div>
            <div className="grid gap-2">
              <Label>Dirección</Label>
              <Input {...form.register("address")} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Rol</Label>
              <Select
                defaultValue={form.getValues("role")}
                onValueChange={(v) =>
                  form.setValue("role", v as "ADMIN" | "CUSTOMER")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 mt-7">
              <Checkbox
                id="active"
                checked={form.watch("active")}
                onCheckedChange={(v) => form.setValue("active", Boolean(v))}
              />
              <Label htmlFor="active">Activo</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {defaultValues?.id ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
