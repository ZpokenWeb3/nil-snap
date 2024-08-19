import { Address } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/snapApi';
import { getPrivateKey } from './getPrivateKey';
import { getWallet } from './getWallet';

export const deployAccount = async (params: ApiParams): Promise<boolean> => {
  const { keyDeriver } = params;

  const privateKey = await getPrivateKey(keyDeriver);

  const wallet = await getWallet(privateKey as Address);

  await wallet.selfDeploy(true);

  return true;
};
