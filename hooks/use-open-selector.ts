import { create } from "zustand";

type OpenSelectorState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenSelector = create<OpenSelectorState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
