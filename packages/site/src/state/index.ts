import { type StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { SendSlice, createSendSlice } from './send';
import { type WalletSlice, createWalletSlice } from './wallet';

export type AllSlices = {
  wallet: WalletSlice;
  send: SendSlice;
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
    send: createSendSlice()(setState, getState, store),
  }));
};

export const useStore = create<AllSlices>()(initializeStore());
