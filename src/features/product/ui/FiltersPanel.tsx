import { Filter, Search } from "lucide-react";
import type { ICategory } from "../types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Props = {
  categories: ICategory[];
};

export function FiltersPanel({ categories }: Props) {
  return (
    <aside
      className="
        bg-white rounded-xl shadow-sm p-4
        lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100dvh-7rem)]
        lg:overflow-auto
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-teal-700" />
          <h3 className="text-base font-semibold text-gray-900">Filtros</h3>
        </div>
        <Button variant="ghost" className="h-8 px-3 text-sm">
          Limpiar
        </Button>
      </div>

      <Separator className="mb-4" />

      <div className="space-y-6">
        {/* Buscar */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm">
            Buscar
          </Label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="search"
              placeholder="Nombre o descripción"
              className="pl-9 h-10"
            />
          </div>
        </div>

        {/* Categoría */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm">
            Categoría
          </Label>
          <Select>
            <SelectTrigger id="category" className="h-10 w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Precio */}
        <div className="space-y-2">
          <Label className="text-sm">Precio</Label>
          <div className="grid grid-cols-2 gap-2 [@media(max-width:420px)]:grid-cols-1">
            <div className="space-y-1">
              <Label
                htmlFor="price-min"
                className="text-xs text-muted-foreground"
              >
                Mín.
              </Label>
              <Input
                id="price-min"
                type="number"
                className="h-10"
                placeholder="0"
                min={0}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="price-max"
                className="text-xs text-muted-foreground"
              >
                Máx.
              </Label>
              <Input
                id="price-max"
                type="number"
                className="h-10"
                placeholder="999"
              />
            </div>
          </div>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <Checkbox id="only-stock" />
          <Label htmlFor="only-stock" className="text-sm">
            Solo disponibles
          </Label>
        </div>

        <Separator />

        {/* Ordenar */}
        <div className="space-y-2">
          <Label htmlFor="sortby" className="text-sm">
            Ordenar por
          </Label>
          <Select>
            <SelectTrigger id="sortby" className="h-10 w-full">
              <SelectValue placeholder="Relevancia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevancia</SelectItem>
              <SelectItem value="priceAsc">Precio: menor a mayor</SelectItem>
              <SelectItem value="priceDesc">Precio: mayor a menor</SelectItem>
              <SelectItem value="nameAsc">Nombre: A → Z</SelectItem>
              <SelectItem value="nameDesc">Nombre: Z → A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botón Limpiar fallback */}
        <Button variant="outline" className="w-full h-10">
          Aplicar filtros
        </Button>
      </div>
    </aside>
  );
}
