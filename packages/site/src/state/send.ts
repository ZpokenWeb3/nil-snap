import { SendRequest, SendResponse } from '@zpoken/metamask-nil-types';

import type { AllSlices, SliceCreator } from '.';
import { request } from '../lib/snapRequest';

export type SendSlice = {
  amount: string;
  setAmount: (amount: string) => void;
  recipient: string;
  setRecipient: (addr: string) => void;
  sendTx: () => Promise<void>;
  txInProgress: boolean;
};

export const createSendSlice = (): SliceCreator<SendSlice> => (set, get) => {
  return {
    amount: '',
    recipient: '',
    txInProgress: false,
    setAmount: (amount) => {
      set((state) => {
        state.send.amount = amount;
      });
    },
    setRecipient: (addr) => {
      set((state) => {
        state.send.recipient = addr;
      });
    },
    sendTx: async () => {
      set((state) => {
        state.send.txInProgress = true;
      });

      const { recipient, amount } = get().send;

      const { getCurrencies } = get().wallet;

      try {
        await request<SendResponse, SendRequest>('nil_send', {
          recipient,
          amount,
        });

        await getCurrencies();

        set((state) => {
          state.send.amount = '';
        });
      } finally {
        set((state) => {
          state.send.txInProgress = false;
        });
      }
    },
  };
};

export const sendSelector = (state: AllSlices) => state.send;
