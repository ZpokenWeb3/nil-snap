import { waitTillCompleted } from '@nilfoundation/niljs';
import { Address, CreateCurrencyRequest } from '@zpoken/metamask-nil-types';

import type { ApiParamsWithKeyDeriver } from '../types/api';
import { client } from './client';
import { getPrivateKey } from './getPrivateKey';
import { getWallet } from './getWallet';

export const createCurrency = async (
  params: ApiParamsWithKeyDeriver,
): Promise<boolean> => {
  const { keyDeriver, requestParams } = params;

  const { name, amount } = requestParams as CreateCurrencyRequest;

  const privateKey = await getPrivateKey(keyDeriver);

  const wallet = await getWallet(privateKey as Address);

  const setCurrencyNameHash = await wallet.setCurrencyName(name);
  await waitTillCompleted(client, wallet.shardId, setCurrencyNameHash);

  const mintCurrencyhash = await wallet.mintCurrency(BigInt(amount));
  await waitTillCompleted(client, wallet.shardId, mintCurrencyhash);

  return true;
};
