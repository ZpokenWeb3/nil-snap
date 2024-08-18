import { GetBalanceRequestParams } from '@zpoken/metamask-nil-types';
import { formatEther } from 'viem';

import type { ApiParams } from '../types/snapApi';
import { client } from './client';

export const getBalance = async (params: ApiParams): Promise<null | string> => {
  const { requestParams } = params;
  const { userAddress } = requestParams as GetBalanceRequestParams;

  const balance = await client.getBalance(userAddress);

  return balance === 0n ? null : formatEther(balance);
};
