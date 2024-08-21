import { Faucet } from '@nilfoundation/niljs';
import { FaucetRequest } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/api';
import { client } from './client';

export const faucetToken = async (params: ApiParams): Promise<boolean> => {
  const { requestParams } = params;
  const { account, amount } = requestParams as FaucetRequest;

  const faucet = new Faucet(client);

  await faucet.withdrawToWithRetry(account, BigInt(amount));

  return true;
};
