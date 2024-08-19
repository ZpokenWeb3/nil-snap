import { type FunctionComponent, type ReactNode, useEffect } from 'react';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useMetaMaskContext } from './hooks/MetamaskContext';
import { useStore } from './state';
import { walletSelector } from './state/wallet';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const { provider } = useMetaMaskContext();

  const { getAccount, getCurrencies } = useStore(walletSelector);

  useEffect(() => {
    if (!provider) {
      return;
    }

    void (async () => {
      try {
        await getAccount();
        await getCurrencies();
      } catch (error) {
        //
      }
    })();
  }, [provider]);

  return (
    <div className="flex flex-col gap-5 pt-5 px-6 h-screen m-0 pb-6">
      <Header />
      <div className="flex gap-5 overflow-y-hidden flex-grow">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};
