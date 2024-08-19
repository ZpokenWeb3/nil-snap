import type { RequestArguments } from '@metamask/providers';

import { useMetaMaskContext } from './MetamaskContext';

export type Request = (params: RequestArguments) => Promise<unknown | null>;

export const useRequest = () => {
  const { provider, setError } = useMetaMaskContext();

  const request: Request = async ({ method, params }) => {
    try {
      const data =
        (await provider?.request({
          method,
          params,
        } as RequestArguments)) ?? null;

      return data;
    } catch (error) {
      setError(error as Error);

      return null;
    }
  };

  return request;
};
