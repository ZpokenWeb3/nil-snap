import { create, type StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createWalletSlice, type WalletSlice } from './wallet';

export type AllSlices = {
  wallet: WalletSlice;
};

export type SliceCreator<SliceInterface> = StateCreator<
  AllSlices,
  [['zustand/immer', never]],
  [],
  SliceInterface
>;

export type Middleware = (
  f: StateCreator<AllSlices, [['zustand/immer', never]]>,
) => StateCreator<AllSlices, [['zustand/immer', never]]>;

export const initializeStore = () => {
  return immer((setState, getState: () => AllSlices, store) => ({
    wallet: createWalletSlice()(setState, getState, store),
  }));
};

export const useStore = create<AllSlices>()(initializeStore());
