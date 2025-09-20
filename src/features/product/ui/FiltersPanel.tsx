import { Filter, Search } from "lucide-react";
import type { ICategory } from "../types";

export function FiltersPanel({ categories }: { categories: ICategory[] }) {
  return (
    <aside
      className="
        bg-white rounded-xl shadow-sm p-6
        lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100dvh-7rem)]
        lg:overflow-auto
      "
    >
      {/* Título */}
      <div className="flex items-center gap-2 mb-6">
        <Filter size={18} className="text-teal-700" />
        <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
      </div>

      <div className="space-y-6">
        {/* Buscar */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Buscar
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Nombre o descripción"
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-teal-500 focus:border-transparent
                         text-sm"
            />
          </div>
        </div>

        {/* Categoría */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Categoría
          </label>
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm 
                       focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Precio
          </label>
          <div className="flex flex-row items-center gap-2 md:flex-col md:items-stretch md:gap-3"> 
            <input
              type="number"
              placeholder="Mín."
              className="p-2.5 border border-gray-200 rounded-lg text-sm
                         focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              placeholder="Máx."
              className="p-2.5 border border-gray-200 rounded-lg text-sm
                         focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stock */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            className="w-4 h-4 text-teal-600 border-gray-300 rounded
                       focus:ring-teal-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Solo disponibles
          </span>
        </label>

        {/* Ordenar */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Ordenar por
          </label>
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm 
                       focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Relevancia</option>
            <option value="priceAsc">Precio: menor a mayor</option>
            <option value="priceDesc">Precio: mayor a menor</option>
            <option value="nameAsc">Nombre: A → Z</option>
            <option value="nameDesc">Nombre: Z → A</option>
          </select>
        </div>

        {/* Botón limpiar */}
        <div className="pt-2">
          <button
            className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 
                       rounded-lg hover:border-teal-500 hover:text-teal-600 
                       transition-colors font-semibold text-sm"
          >
            Limpiar
          </button>
        </div>
      </div>
    </aside>
  );
}
