import type { FunctionComponent, ReactNode } from 'react';

import { MetaMaskProvider } from './hooks/MetamaskContext';
import './style/globals.css';

export type RootProps = {
  children: ReactNode;
};

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  return <MetaMaskProvider>{children}</MetaMaskProvider>;
};
