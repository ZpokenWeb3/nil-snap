import {
  MINTER_ABI,
  MINTER_ADDRESS,
  waitTillCompleted,
} from '@nilfoundation/niljs';
import { Address, CreateCurrencyRequest } from '@zpoken/metamask-nil-types';
import { encodeFunctionData } from 'viem';

import type { ApiParamsWithKeyDeriver } from '../types/api';
import { client } from './client';
import { getPrivateKey } from './getPrivateKey';
import { getWallet } from './getWallet';

export const createCurrency = async (
  params: ApiParamsWithKeyDeriver,
): Promise<boolean> => {
  const { keyDeriver, requestParams } = params;

  const { name, amount } = requestParams as CreateCurrencyRequest;

  const privateKey = await getPrivateKey(keyDeriver);

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
