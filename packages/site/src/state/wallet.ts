import type { AllSlices, SliceCreator } from '.';
import type { Account, Address, Currency } from '../types/wallet';

export type WalletSlice = {
  accounts: Account[];
  balances: Record<Address, string>;
  currencies: Record<Address, Currency[]>;
  setAccounts: (accounts: Account[]) => void;
  setBalances: (balances: Record<Address, string>) => void;
  setCurrencies: (currencies: Record<Address, Currency[]>) => void;
  setDeploySatus: (account: Address) => void;
};

export const createWalletSlice =
  (): SliceCreator<WalletSlice> => (set, get) => {
    return {
      accounts: [],
      balances: {},
      currencies: {},
      setAccounts: (accounts) => {
        set((state) => {
          state.wallet.accounts = accounts;
        });
      },
      setBalances: (balances) => {
        set((state) => {
          state.wallet.balances = balances;
        });
      },
      setCurrencies: (currencies) => {
        set((state) => {
          state.wallet.currencies = currencies;
        });
      },
      setDeploySatus: (account) => {
        const accounts = get().wallet.accounts.map((i) => {
          if (account === i.account) {
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
