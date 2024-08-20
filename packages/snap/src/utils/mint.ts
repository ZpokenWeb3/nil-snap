import {
  MINTER_ABI,
  MINTER_ADDRESS,
  hexToBigInt,
  waitTillCompleted,
} from '@nilfoundation/niljs';
import { Address, MintRequest } from '@zpoken/metamask-nil-types';
import { encodeFunctionData } from 'viem';

import type { ApiParamsWithKeyDeriver } from '../types/api';
import { client } from './client';
import { getPrivateKey } from './getPrivateKey';
import { getWallet } from './getWallet';

export const mint = async (
  params: ApiParamsWithKeyDeriver,
): Promise<boolean> => {
  const { keyDeriver, requestParams } = params;

  const { amount } = requestParams as MintRequest;

  const privateKey = await getPrivateKey(keyDeriver);

  const wallet = await getWallet(privateKey as Address);

  const walletAddress = wallet.getAddressHex();

  const hash = await wallet.sendMessage({
    to: MINTER_ADDRESS,
    feeCredit: 5_000_000n,
    value: 1_000_000n,
    data: encodeFunctionData({
      abi: MINTER_ABI,
      functionName: 'mint',
      args: [hexToBigInt(walletAddress), BigInt(amount), walletAddress],
    }),
  });

  await waitTillCompleted(client, wallet.shardId, hash);

  return true;
};
