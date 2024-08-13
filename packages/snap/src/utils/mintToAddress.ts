import {
  MINTER_ABI,
  MINTER_ADDRESS,
  waitTillCompleted,
} from '@nilfoundation/niljs';
import { encodeFunctionData, hexToBigInt, parseEther } from 'viem';

import type { ApiParams, MintToAddressRequestParams } from '../types/snapApi';
import { client } from './client';
import { getWallet } from './getWallet';

export const mintToAddress = async (params: ApiParams) => {
  const { keyDeriver, requestParams } = params;
  const { receiver, amount } = requestParams as MintToAddressRequestParams;

  if (!keyDeriver) {
    throw new Error('KeyDeriver wasn`t found!');
  }

  const accountKey = await keyDeriver.derive(["bip32:0'"]);

  const { privateKey } = accountKey;

  if (!privateKey) {
    throw new Error('Private key wasn`t found!');
  }

  const walletV1 = await getWallet(privateKey as `0x${string}`);

  const walletAddress = walletV1.getAddressHex();

  const txhash = await walletV1.sendMessage({
    to: MINTER_ADDRESS,
    feeCredit: 1_000_000n,
    value: 100_000_000n,
    data: encodeFunctionData({
      abi: MINTER_ABI,
      functionName: 'mint',
      args: [hexToBigInt(walletAddress), parseEther(amount), receiver],
    }),
  });

  await waitTillCompleted(client, 1, txhash);

  return {
    hash: txhash,
  };
};
