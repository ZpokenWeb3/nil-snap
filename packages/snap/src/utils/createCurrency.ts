import {
  MINTER_ABI,
  MINTER_ADDRESS,
  waitTillCompleted,
} from '@nilfoundation/niljs';
import { Address, CreateCurrencyRequest } from '@zpoken/metamask-nil-types';
import { encodeFunctionData } from 'viem';

import type { ApiParams } from '../types/snapApi';
import { client } from './client';
import { getWallet } from './getWallet';

export const createCurrency = async (params: ApiParams): Promise<boolean> => {
  const { keyDeriver, requestParams } = params;

  const { name, amount } = requestParams as CreateCurrencyRequest;

  if (!keyDeriver) {
    throw new Error('KeyDeriver wasn`t found!');
  }

  const accountKey = await keyDeriver.derive(["bip32:0'"]);

  const { privateKey } = accountKey;

  if (!privateKey) {
    throw new Error('Private key wasn`t found!');
  }

  const wallet = await getWallet(privateKey as Address);

  const walletAddress = wallet.getAddressHex();

  const currencyCreationMessage = await wallet.sendMessage({
    to: MINTER_ADDRESS,
    feeCredit: 1_000_000n,
    value: 100_000_000n,
    data: encodeFunctionData({
      abi: MINTER_ABI,
      functionName: 'create',
      args: [BigInt(amount), walletAddress, name, walletAddress],
    }),
  });

  await waitTillCompleted(client, wallet.shardId, currencyCreationMessage);

  return true;
};
