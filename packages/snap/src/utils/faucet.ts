import { Faucet } from '@nilfoundation/niljs';

import type { ApiParams, GetBalanceRequestParams } from '../types/snapApi';
import { client } from './client';

export const faucetToken = async (params: ApiParams) => {
  const { requestParams } = params;
  const { userAddress } = requestParams as GetBalanceRequestParams;

  const faucet = new Faucet(client);
  await faucet.withdrawToWithRetry(userAddress, 1000000000000n);

  return true;
};
