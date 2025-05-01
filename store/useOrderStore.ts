import { create } from 'zustand';
import { IRound, TBeerInOrder } from '@/types';

type OrderState = {
  rounds: IRound[];
  addRound: (items: TBeerInOrder[]) => void;
  clearOrder: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  rounds: [],
  addRound: (items) =>
    set((state) => ({
      rounds: [
        ...state.rounds,
        {
          created: new Date().toISOString(),
          items,
        },
      ],
    })),
  clearOrder: () => set({ rounds: [] }),
}));
