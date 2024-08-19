import type {
  Account,
  Address,
  Currency,
  FaucetResponse,
  GetCurrenciesResponse,
} from '@zpoken/metamask-nil-types';

import type { AllSlices, SliceCreator } from '.';
import { request } from '../lib/snapRequest';

export type WalletSlice = {
  accounts: Account[];
  selectedAccount: Account | undefined;
  getAccount: () => Promise<void>;
  currencies: Record<Address, Currency[]>;
  getCurrencies: () => Promise<void>;
  setDeploySatus: (account: Address) => void;
  faucet: () => Promise<void>;
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
    };
  };

export const walletSelector = (state: AllSlices) => state.wallet;
