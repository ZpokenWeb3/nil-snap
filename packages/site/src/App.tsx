import { useEffect, type FunctionComponent, type ReactNode } from 'react';

import { HeaderButtons } from './components/Buttons';
import { useMetaMaskContext } from './hooks/MetamaskContext';
import { useInvokeSnap } from './hooks/useInvokeSnap';
import { useStore } from './state';
import { walletSelector } from './state/wallet';
import type { Account, Currency } from './types/wallet';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const { provider } = useMetaMaskContext();
  const request = useInvokeSnap();
  const { setAccounts, setBalances, setCurrencies } = useStore(walletSelector);

  useEffect(() => {
    if (!provider) {
      return;
    }

    // eslint-disable-next-line no-void
    void (async () => {
      try {
        const account = (await request({
          method: 'nill_createAccount',
        })) as Account;
        setAccounts([account]);

        const balance = (await request({
          method: 'nill_getBalance',
          params: {
            userAddress: account.account,
          },
        })) as string;

        setBalances({ [account.account]: balance });

        const currencies = (await request({
          method: 'nill_getCurrencies',
          params: {
            userAddress: account.account,
          },
        })) as Currency[];

        setCurrencies({ [account.account]: currencies });
      } catch (error) {
        //
      }
    })();
  }, [provider]);

  return (
    <>
      <HeaderButtons />
      {children}
    </>
  );
};
