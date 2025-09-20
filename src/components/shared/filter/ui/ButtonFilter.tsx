import { useOpenFiltersPanel } from "@/store/useFilterStore";
import { SlidersHorizontal } from "lucide-react";

const ButtonFilter = () => {
  const openFiltersPanel = useOpenFiltersPanel();

  return (
    <button
      onClick={openFiltersPanel}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600"
    >
      <SlidersHorizontal size={18} />
      Filtros
    </button>
  );
};

export default ButtonFilter;
