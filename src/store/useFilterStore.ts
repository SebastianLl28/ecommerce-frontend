import { create } from 'zustand'

interface FilterState {
  isFiltersPanelOpen: boolean;
  toggleFiltersPanel: () => void;
  closeFiltersPanel: () => void;
  openFiltersPanel: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  isFiltersPanelOpen: false,
  toggleFiltersPanel: () =>
    set((state) => ({ isFiltersPanelOpen: !state.isFiltersPanelOpen })),
  closeFiltersPanel: () => set({ isFiltersPanelOpen: false }),
  openFiltersPanel: () => set({ isFiltersPanelOpen: true }),
}))

export const useIsFiltersPanelOpen = () =>
  useFilterStore((state) => state.isFiltersPanelOpen)

export const useToggleFiltersPanel = () =>
  useFilterStore((state) => state.toggleFiltersPanel)

export const useCloseFiltersPanel = () =>
  useFilterStore((state) => state.closeFiltersPanel)

export const useOpenFiltersPanel = () =>
  useFilterStore((state) => state.openFiltersPanel)