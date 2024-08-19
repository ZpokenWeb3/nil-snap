import {
  SendMessageParams,
  hexToBigInt,
  waitTillCompleted,
} from '@nilfoundation/niljs';
import { Address, SendRequest, SendResponse } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/snapApi';
import { client } from './client';
import { getWallet } from './getWallet';

export const send = async (params: ApiParams): Promise<SendResponse> => {
  const { keyDeriver, requestParams } = params;

  const { recipient, amount, tokenId } = requestParams as SendRequest;

  if (!keyDeriver) {
    throw new Error('KeyDeriver wasn`t found!');
  }

  const accountKey = await keyDeriver.derive(["bip32:0'"]);

  const { privateKey } = accountKey;

  if (!privateKey) {
    throw new Error('Private key wasn`t found!');
  }

  const wallet = await getWallet(privateKey as Address);

  const tx: SendMessageParams = {
    to: recipient as Address,
    feeCredit: 100_000n * 10n,
    value: 0n,
  };

  if (tokenId) {
    tx.tokens = [
      {
        id: hexToBigInt(tokenId),
        amount: BigInt(amount),
      },
    ];
  } else {
    tx.value = BigInt(amount);
  }

  const hash = await wallet.sendMessage(tx);

  await waitTillCompleted(client, wallet.shardId, hash);

  return {
    hash,
  };
};
