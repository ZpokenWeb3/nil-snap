import { RequestArguments } from '@metamask/providers';
import { NilMethods } from '@zpoken/metamask-nil-types';

import { defaultSnapOrigin } from '../config/snap';
import { useRequest } from './useRequest';

export const useInvokeSnap = (snapId = defaultSnapOrigin) => {
  const request = useRequest();

  const invokeSnap = async <T>({
    method,
    params,
  }: {
    method: NilMethods;
    params?: RequestArguments['params'];
  }) => {
    try {
      return (await request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: params ? { method, params } : { method },
        },
      })) as T;
    } catch (error) {
      return undefined;
    }
  };

  return invokeSnap;
};
