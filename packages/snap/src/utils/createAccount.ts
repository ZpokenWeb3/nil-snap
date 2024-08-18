import { Account, Address } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/snapApi';
import { getWallet } from './getWallet';

export const createAccount = async (params: ApiParams): Promise<Account> => {
  const { keyDeriver } = params;

  if (!keyDeriver) {
    throw new Error('KeyDeriver wasn`t found!');
  }

  const accountKey = await keyDeriver.derive(["bip32:0'"]);

  const { privateKey } = accountKey;

  if (!privateKey) {
    throw new Error('Private key wasn`t found!');
  }

  const wallet = await getWallet(privateKey as Address);

  return {
    address: wallet.getAddressHex(),
    isDeployed: await wallet.checkDeploymentStatus(),
    shardId: wallet.shardId,
  };
};
