import { Address } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/snapApi';
import { getWallet } from './getWallet';

export const deployAccount = async (params: ApiParams): Promise<boolean> => {
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

  await wallet.selfDeploy(true);

  return true;
};
