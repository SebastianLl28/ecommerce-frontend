import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useGetUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../hooks";
import type { UserDTO } from "../types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

import UserFormDialog from "../ui/UserFormDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DEFAULT_USER_TEMP_PASSWORD } from "@/config/constants";

const schema = z.object({
  firstName: z.string().min(1, "Requerido"),
  lastName: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  role: z.enum(["ADMIN", "CUSTOMER"]),
  active: z.boolean().default(true),
});
type FormValues = z.infer<typeof schema>;

export default function UsersPage() {
  const { data, isLoading, isError } = useGetUsers();
  const list: UserDTO[] = useMemo(
    () => data?.data?.data ?? data?.data ?? [],
    [data]
  );

  const { mutate: createUser, isPending: creating } = useCreateUser();
  const { mutate: updateUser, isPending: updating } = useUpdateUser();
  const { mutate: removeUser, isPending: deleting } = useDeleteUser();

  // Modal form state
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<UserDTO | null>(null);

  // Confirm delete state
  const [toDelete, setToDelete] = useState<UserDTO | null>(null);

  // RHF solo para preparar defaults en dialog (el form real está dentro del Dialog)
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      role: "CUSTOMER",
      active: true,
    },
  });

  const startCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const startEdit = (u: UserDTO) => {
    setEditing(u);
    setOpenForm(true);
  };

  const onSubmit = (values: FormValues) => {
    if (editing) {
      updateUser({ id: editing.id, payload: values });
    } else {
      // usa default fija…
      createUser({ ...values, password: DEFAULT_USER_TEMP_PASSWORD } as any);

      // …o aleatoria:
      // createUser({ ...values, password: genTempPassword(12) } as any);
    }
    setOpenForm(false);
  };

  const askDelete = (u: UserDTO) => setToDelete(u);
  const confirmDelete = () => {
    if (toDelete) removeUser(toDelete.id);
    setToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold">Usuarios</h1>
          </div>
          <Button className="gap-2" onClick={startCreate}>
            <Plus className="h-4 w-4" /> Nuevo usuario
          </Button>
        </div>

        {/* Estados */}
        {isLoading && (
          <Card className="rounded-xl mb-6">
            <CardContent className="p-6 text-sm text-muted-foreground">
              Cargando usuarios…
            </CardContent>
          </Card>
        )}
        {isError && !isLoading && (
          <Card className="rounded-xl mb-6">
            <CardContent className="p-6 text-sm text-red-600">
              No se pudieron cargar los usuarios.
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
                  <th>Nombre</th>
                  <th>Email</th>
                  <th className="min-w-[140px]">Teléfono</th>
                  <th className="min-w-[200px]">Dirección</th>
                  <th className="w-[120px]">Rol</th>
                  <th className="w-[110px]">Estado</th>
                  <th className="w-[170px]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-6 text-center text-muted-foreground"
                    >
                      Aún no hay usuarios.
                    </td>
                  </tr>
                )}

                {list.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-3 tabular-nums">{u.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium truncate">
                        {u.fullName ?? `${u.firstName} ${u.lastName}`}
                      </div>
                    </td>
                    <td className="px-4 py-3 truncate">{u.email}</td>
                    <td className="px-4 py-3">{u.phone ?? "—"}</td>
                    <td className="px-4 py-3 truncate">{u.address ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={u.role === "ADMIN" ? "default" : "secondary"}
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={u.active ? "secondary" : "outline"}>
                        {u.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => startEdit(u)}
                        >
                          <Pencil className="h-4 w-4" /> Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                          onClick={() => askDelete(u)}
                          disabled={deleting}
                        >
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Separator className="my-8" />

        {/* Modal Crear/Editar (shadcn dialog) */}
        <UserFormDialog
          open={openForm}
          onOpenChange={setOpenForm}
          defaultValues={editing ?? undefined}
          onSubmit={onSubmit}
          loading={creating || updating}
        />

        {/* Confirmación Eliminar (shadcn alert-dialog) */}
        <AlertDialog
          open={!!toDelete}
          onOpenChange={(o) => !o && setToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer.
            </p>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
