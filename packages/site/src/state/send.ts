import {
  Currency,
  SendRequest,
  SendResponse,
} from '@zpoken/metamask-nil-types';
import { parseUnits } from 'viem';

import type { AllSlices, SliceCreator } from '.';
import { request } from '../lib/snapRequest';

export type SendSlice = {
  amount: string;
  setAmount: (amount: string) => void;
  recipient: string;
  setRecipient: (addr: string) => void;
  currency: Currency | undefined;
  setCurrency: (currency: Currency) => void;
  sendTx: () => Promise<void>;
  txInProgress: boolean;
};

export const createSendSlice = (): SliceCreator<SendSlice> => (set, get) => {
  return {
    amount: '',
    recipient: '',
    currency: undefined,
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
    setCurrency: (currency) => {
      set((state) => {
        state.send.currency = currency;
      });
    },
    sendTx: async () => {
      set((state) => {
        state.send.txInProgress = true;
      });

      const { recipient, amount, currency } = get().send;

      const { getCurrencies } = get().wallet;

      try {
        const req: SendRequest = {
          recipient,
          amount: currency?.decimals
            ? parseUnits(amount, currency.decimals).toString()
            : amount,
        };

        if (currency?.id) {
          req.tokenId = currency.id;
        }
        const res = await request<SendResponse, SendRequest>('nil_send', req);

        if (res) {
          await getCurrencies();

          set((state) => {
            state.send.amount = '';
          });
        }
      } finally {
        set((state) => {
          state.send.txInProgress = false;
        });
      }
    },
  };
};

export const sendSelector = (state: AllSlices) => state.send;
