import { create } from 'zustand';
import { Sku as SKU } from '../models';

type SkuSerialsModalState = {
  isOpen: boolean;
  sku: SKU | null;
};

type SkuSerialsModalActionns = {
  setSku: (sku: SKU | null) => void;
  onOpen: () => void;
  onClose: () => void;
};

type SkuSerialsModalStore = SkuSerialsModalState & SkuSerialsModalActionns;

export const useSkuSerialsModal = create<SkuSerialsModalStore>((set) => ({
  isOpen: false,
  sku: null,
  setSku: (sku: SKU | null) => set({ sku }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
