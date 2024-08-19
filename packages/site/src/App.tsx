import { type Account, type Currency } from '@zpoken/metamask-nil-types';
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
        const account = await request<Account>({
          method: 'nil_createAccount',
        });
        if (!account) return;

        setAccounts([account]);

        const balance = await request<string>({
          method: 'nil_getBalance',
          params: {
            userAddress: account.address,
          },
        });

        setBalances({ [account.address]: balance ?? '0' });

        const currencies = await request<Currency[]>({
          method: 'nil_getCurrencies',
          params: {
            userAddress: account.address,
          },
        });

        setCurrencies({ [account.address]: currencies ?? [] });
      } catch (error) {
        //
      }
    })();
  }, [provider]);

  return (
    <div className="flex flex-col gap-5 pt-5 px-6 h-screen m-0 pb-6">
      <Header />
      <div className="flex gap-5 overflow-y-hidden">
        <aside className="basis-[266px] bg-card ">asd</aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};
