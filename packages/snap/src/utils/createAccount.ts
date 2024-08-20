import { Account, Address } from '@zpoken/metamask-nil-types';

import type { ApiParamsWithKeyDeriver } from '../types/api';
import { getPrivateKey } from './getPrivateKey';
import { getWallet } from './getWallet';

export const createAccount = async (
  params: ApiParamsWithKeyDeriver,
): Promise<Account> => {
  const { keyDeriver } = params;

  const privateKey = await getPrivateKey(keyDeriver);

  const wallet = await getWallet(privateKey as Address);

  return {
    address: wallet.getAddressHex(),
    isDeployed: await wallet.checkDeploymentStatus(),
    shardId: wallet.shardId,
  };
};
