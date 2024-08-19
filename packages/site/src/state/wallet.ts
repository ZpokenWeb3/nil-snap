import type {
  Account,
  Address,
  Currency,
  GetBalanceRequest,
} from '@zpoken/metamask-nil-types';

import type { AllSlices, SliceCreator } from '.';
import { request } from '../lib/snapRequest';

export type WalletSlice = {
  accounts: Account[];
  getAccount: () => Promise<void>;
  balances: Record<Address, string>;
  getBalances: () => Promise<void>;
  currencies: Record<Address, Currency[]>;
  getCurrencies: () => Promise<void>;
  setDeploySatus: (account: Address) => void;
};

export const createWalletSlice =
  (): SliceCreator<WalletSlice> => (set, get) => {
    return {
      accounts: [],
      balances: {},
      currencies: {},
      getAccount: async () => {
        const account = await request<Account, undefined>('nil_createAccount');
        set((state) => {
          state.wallet.accounts = [account];
        });
      },

      getBalances: async () => {
        const { accounts } = get().wallet;

        const address = accounts[0]?.address;
        if (!address) return;

        const balance = await request<string, GetBalanceRequest>(
          'nil_getBalance',
          { userAddress: address },
        );

        set((state) => {
          state.wallet.balances = { [address]: balance ?? '0' };
        });
      },
      getCurrencies: async () => {
        const { accounts } = get().wallet;

        const address = accounts[0]?.address;
        if (!address) return;

        const currencies = await request<Currency[], GetBalanceRequest>(
          'nil_getCurrencies',
          { userAddress: address },
        );

        set((state) => {
          state.wallet.currencies = { [address]: currencies ?? [] };
        });
      },
      setDeploySatus: (account) => {
        const accounts = get().wallet.accounts.map((i) => {
          if (account === i.address) {
            return {
              ...i,
              isDeployed: true,
            };
          }

          return {
            ...i,
          };
        });
        set((state) => {
          state.wallet.accounts = accounts;
        });
      },
    };
  };

export const walletSelector = (state: AllSlices) => state.wallet;
