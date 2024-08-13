import type { ApiParams } from '../types/snapApi';
import { getWallet } from './getWallet';

export const deployAccount = async (params: ApiParams) => {
  const { keyDeriver } = params;

  if (!keyDeriver) {
    throw new Error('KeyDeriver wasn`t found!');
  }

  const accountKey = await keyDeriver.derive(["bip32:0'"]);

  const { privateKey } = accountKey;

  if (!privateKey) {
    throw new Error('Private key wasn`t found!');
  }

  const walletV1 = await getWallet(privateKey as `0x${string}`);

  await walletV1.selfDeploy(true);

  return true;
};
