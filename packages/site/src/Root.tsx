import type { FunctionComponent, ReactNode } from 'react';

import { Toaster } from './components/ui/toaster';
import { MetaMaskProvider } from './hooks/MetamaskContext';
import './style/globals.css';

export type RootProps = {
  children: ReactNode;
};

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  return (
    <MetaMaskProvider>
      {children}
      <Toaster />
    </MetaMaskProvider>
  );
};
