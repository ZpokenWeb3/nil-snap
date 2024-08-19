import { Faucet } from '@nilfoundation/niljs';
import { GetBalanceRequest } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/snapApi';
import { client } from './client';

export const faucetToken = async (params: ApiParams): Promise<boolean> => {
  const { requestParams } = params;
  const { userAddress } = requestParams as GetBalanceRequest;

  const faucet = new Faucet(client);
  await faucet.withdrawToWithRetry(userAddress, 1000000000000n);

  return true;
};
