import { create } from 'zustand';
import { SPUModelSchemaDto } from '@techcell/node-sdk';

type SpuModelUpdateModalState = {
  isOpen: boolean;
  model: SPUModelSchemaDto | null;
};

type SpuModelUpdateModalActionns = {
  setModel: (model: SPUModelSchemaDto | null) => void;
  onOpen: () => void;
  onClose: () => void;
};

type SpuModelUpdateModalStore = SpuModelUpdateModalState & SpuModelUpdateModalActionns;

export const useSpuModelUpdateModal = create<SpuModelUpdateModalStore>((set) => ({
  isOpen: false,
  model: null,
  setModel: (model: SPUModelSchemaDto | null) => set({ model }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
