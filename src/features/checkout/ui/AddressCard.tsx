import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AtSign, Phone } from "lucide-react";
import { mockContact } from "@/config/constants";

type Contact = typeof mockContact;

export default function ContactCard({ data }: { data?: Partial<Contact> }) {
  const c = { ...mockContact, ...data };
  return (
    <Card className="rounded-xl">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Contacto</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <AtSign className="h-5 w-5 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Correo</p>
              <p className="truncate font-medium">{c.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <p className="truncate font-medium">{c.phone}</p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="h-10">
          Editar contacto
        </Button>
      </CardContent>
    </Card>
  );
}
