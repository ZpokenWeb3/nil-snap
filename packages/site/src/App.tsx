import type { Account, Currency } from '@zpoken/metamask-nil-types';
import { type FunctionComponent, type ReactNode, useEffect } from 'react';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useMetaMaskContext } from './hooks/MetamaskContext';
import { useInvokeSnap } from './hooks/useInvokeSnap';
import { useStore } from './state';
import { walletSelector } from './state/wallet';

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
    <div className="flex flex-col gap-5 pt-5 px-6 h-screen m-0 pb-6">
      <Header />
      <div className="flex h-[calc(100vh-114px)] gap-5">
        <aside className="basis-[266px] bg-red-500">asd</aside>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
