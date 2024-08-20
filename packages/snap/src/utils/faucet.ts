import { Faucet } from '@nilfoundation/niljs';
import { FaucetResponse } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/api';
import { client } from './client';

export const faucetToken = async (params: ApiParams): Promise<boolean> => {
  const { requestParams } = params;
  const { account } = requestParams as FaucetResponse;

  const faucet = new Faucet(client);

  await faucet.withdrawToWithRetry(account, 1000000000000n);

  return true;
};
