import type {
  Account,
  Address,
  CreateCurrencyRequest,
  Currency,
  FaucetResponse,
  GetCurrenciesResponse,
  MintRequest,
} from '@zpoken/metamask-nil-types';

import type { AllSlices, SliceCreator } from '.';
import { request } from '../lib/snapRequest';

export type WalletSlice = {
  accounts: Account[];
  selectedAccount: Account | undefined;
  getAccount: () => Promise<void>;
  currencies: Record<Address, Currency[]>;
  getCurrencies: () => Promise<void>;
  deploy: () => Promise<void>;
  faucet: () => Promise<void>;
  createCurrency: () => Promise<void>;
  mint: () => Promise<void>;
};

export const createWalletSlice =
  (): SliceCreator<WalletSlice> => (set, get) => {
    return {
      accounts: [],
      selectedAccount: undefined,
      currencies: {},
      getAccount: async () => {
        const account = await request<Account, undefined>(
          'nil_createAccount',
          undefined,
        );
        set((state) => {
          state.wallet.accounts = [account];
          state.wallet.selectedAccount = account;
        });
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
      deploy: async () => {
        const { selectedAccount } = get().wallet;
        if (!selectedAccount) return;

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
      },
      faucet: async () => {
        const { selectedAccount } = get().wallet;

        if (!selectedAccount) return;

        const res = await request<boolean, FaucetResponse>('nil_faucet', {
          account: selectedAccount.address,
        });

        if (res) {
          const { getCurrencies } = get().wallet;
          await getCurrencies();
        }
      },
      createCurrency: async () => {
        const res = await request<boolean, CreateCurrencyRequest>(
          'nil_createCurrency',
          {
            name: 'Test',
            amount: '10000000000000',
          },
        );

        if (res) {
          const { getCurrencies } = get().wallet;
          await getCurrencies();
        }
      },
      mint: async () => {
        const res = await request<boolean, MintRequest>('nil_mint', {
          amount: '10000000000000',
        });

        if (res) {
          const { getCurrencies } = get().wallet;
          await getCurrencies();
        }
      },
    };
  };

export const walletSelector = (state: AllSlices) => state.wallet;
