import { LocalECDSAKeySigner, WalletV1 } from '@nilfoundation/niljs';

import { client } from './client';

export const getWallet = async (privateKey: `0x${string}`) => {
  const signer = new LocalECDSAKeySigner({
    privateKey,
  });

  const pubkey = await signer.getPublicKey();

  const wallet = new WalletV1({
    pubkey,
    salt: 16n,
    shardId: 1,
    client,
    signer,
  });

  return wallet;
};
