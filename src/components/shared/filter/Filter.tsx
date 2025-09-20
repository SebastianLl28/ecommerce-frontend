import { categories } from "@/config/constants";
import { FiltersPanel } from "@/features/product/ui/FiltersPanel";
import {
  useCloseFiltersPanel,
  useIsFiltersPanelOpen,
} from "@/store/useFilterStore";

const Filter = () => {
  const isFiltersPanelOpen = useIsFiltersPanelOpen();
  const closeFiltersPanel = useCloseFiltersPanel();

  return (
    isFiltersPanelOpen && (
      <div className="lg:hidden fixed inset-0 z-50">
        <button
          onClick={closeFiltersPanel}
          className="absolute inset-0 bg-black/30"
          aria-label="Cerrar filtros"
        />
        <div
          className="absolute inset-y-0 left-0 w-[85%] max-w-[360px] bg-white shadow-xl p-6
                          animate-[slideIn_.2s_ease-out]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Filtros</h3>
            <button
              onClick={closeFiltersPanel}
              className="px-3 py-1.5 rounded-md border border-gray-200 text-gray-700"
            >
              Cerrar
            </button>
          </div>
          <FiltersPanel categories={categories} />
        </div>
      </div>
    )
  );
};

export default Filter;
