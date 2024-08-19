import { LocalECDSAKeySigner, WalletV1 } from '@nilfoundation/niljs';
import { Address } from '@zpoken/metamask-nil-types';

import { client } from './client';

export const getWallet = async (privateKey: Address) => {
  const signer = new LocalECDSAKeySigner({
    privateKey,
  });

  const pubkey = await signer.getPublicKey();

  const wallet = new WalletV1({
    pubkey,
    salt: 76n,
    shardId: 1,
    client,
    signer,
  });

  return wallet;
};
