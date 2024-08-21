import {
  type FunctionComponent,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

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
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedAccount, currencies, getAccount, getCurrencies } =
    useStore(walletSelector);

  useEffect(() => {
    if (!provider) {
      return;
    }

    void (async () => {
      try {
        await getAccount();
      } catch (error) {
        setLoading(true);
      }
    })();
  }, [provider]);

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }

    void (async () => {
      try {
        await getCurrencies();
      } catch (error) {
      } finally {
        setLoading(true);
      }
    })();
  }, [selectedAccount]);

  if (!loading) return <></>;

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
