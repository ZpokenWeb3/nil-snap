import { Faucet } from '@nilfoundation/niljs';
import { GetBalanceRequestParams } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/snapApi';
import { client } from './client';

export const faucetToken = async (params: ApiParams): Promise<boolean> => {
  const { requestParams } = params;
  const { userAddress } = requestParams as GetBalanceRequestParams;

  const faucet = new Faucet(client);
  await faucet.withdrawToWithRetry(userAddress, 1000000000000n);

  return true;
};
