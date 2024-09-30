import type {
  Account,
  Address,
  CreateCurrencyRequest,
  Currency,
  FaucetRequest,
  GetCurrenciesResponse,
  MintRequest,
  Transaction,
} from '@zpoken/metamask-nil-types';

import type { AllSlices, SliceCreator } from '.';
import { getUniqueListBy } from '../lib/getUniqueListBy';
import { request } from '../lib/snapRequest';

export type WalletSlice = {
  accounts: Account[];
  selectedAccount: Account | undefined;
  getAccount: () => Promise<void>;
  currencies: Record<Address, Currency[]>;
  getCurrencies: () => Promise<void>;
  transactions: Transaction[];
  getTransactions: () => Promise<void>;
  deploy: () => Promise<void>;
  faucet: (amount: string) => Promise<void>;
  createCurrency: (name: string, amount: string) => Promise<void>;
  mint: (amount: string) => Promise<void>;
};

export const createWalletSlice =
  (): SliceCreator<WalletSlice> => (set, get) => {
    return {
      accounts: [],
      selectedAccount: undefined,
      currencies: {},
      transactions: [],
      getAccount: async () => {
        try {
          const account = await request<Account, undefined>(
            'nil_createAccount',
            undefined,
          );

          set((state) => {
            state.wallet.accounts = [account];
            state.wallet.selectedAccount = account;
          });
        } catch (error) {
          console.error(error);
        }
      },
      getCurrencies: async () => {
        const { selectedAccount } = get().wallet;

        if (!selectedAccount) return;

        const currencies = await request<Currency[], GetCurrenciesResponse>(
          'nil_getCurrencies',
          { account: selectedAccount.address },
        );

        set((state) => {
          state.wallet.currencies = {
            [selectedAccount.address]: currencies ?? [],
          };
        });
      },

      getTransactions: async () => {
        const { selectedAccount } = get().wallet;

        if (!selectedAccount) return;

        const txs = await request<Transaction[], GetCurrenciesResponse>(
          'nil_getTransactions',
          { account: selectedAccount.address },
        );

        const filteredTxs = getUniqueListBy<Transaction>(txs, 'hash').sort(
          (a, b) => b.block_id - a.block_id,
        );

        set((state) => {
          state.wallet.transactions = filteredTxs;
        });
      },
      deploy: async () => {
        const { selectedAccount } = get().wallet;
        if (!selectedAccount) return;
        try {
          const res = await request<boolean, undefined>(
            'nil_deployAccount',
            undefined,
          );

          if (res) {
            const accounts = get().wallet.accounts.map((i) => {
              if (selectedAccount.address === i.address) {
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
              state.wallet.selectedAccount = accounts.find(
                (i) => i.address === selectedAccount.address,
              );
            });

            const { getCurrencies } = get().wallet;
            await getCurrencies();
          }
        } catch (error) {}
      },
      faucet: async (amount) => {
        const { selectedAccount } = get().wallet;

        if (!selectedAccount) return;

        const res = await request<boolean, FaucetRequest>('nil_faucet', {
          account: selectedAccount.address,
          amount,
        });

        if (res) {
          const { getCurrencies } = get().wallet;
          await getCurrencies();
        }
      },
      createCurrency: async (name, amount) => {
        const res = await request<boolean, CreateCurrencyRequest>(
          'nil_createCurrency',
          {
            name,
            amount,
          },
        );

        if (res) {
          const { getCurrencies } = get().wallet;
          await getCurrencies();
        }
      },
      mint: async (amount) => {
        const res = await request<boolean, MintRequest>('nil_mint', {
          amount,
        });

        if (res) {
          const { getCurrencies } = get().wallet;
          await getCurrencies();
        }
      },
    };
  };

export const walletSelector = (state: AllSlices) => state.wallet;
