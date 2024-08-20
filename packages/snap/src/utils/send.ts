import {
  Component,
  DialogType,
  copyable,
  heading,
  panel,
  text,
} from '@metamask/snaps-sdk';
import {
  SendMessageParams,
  hexToBigInt,
  waitTillCompleted,
} from '@nilfoundation/niljs';
import { Address, SendRequest, SendResponse } from '@zpoken/metamask-nil-types';

import type { ApiParamsWithKeyDeriver } from '../types/api';
import { client } from './client';
import { getPrivateKey } from './getPrivateKey';
import { getWallet } from './getWallet';

export const send = async (
  params: ApiParamsWithKeyDeriver,
): Promise<SendResponse> => {
  const { keyDeriver, requestParams, wallet: snap } = params;

  const { recipient, amount, tokenId } = requestParams as SendRequest;

  const privateKey = await getPrivateKey(keyDeriver);

  const wallet = await getWallet(privateKey as Address);

  const tx: SendMessageParams = {
    to: recipient as Address,
    feeCredit: 1_000_000n,
    value: 0n,
  };

  if (tokenId) {
    tx.tokens = [
      {
        id: hexToBigInt(tokenId as Address),
        amount: BigInt(amount),
      },
    ];
  } else {
    tx.value = BigInt(amount);
  }

  const components: Component[] = [];
  //add sender
  components.push(text(`**${'Signer Address'}:**`));
  components.push(copyable(wallet.getAddressHex()));

  //add recipient
  components.push(text(`**${'Recipient Address'}:**`));
  components.push(copyable(recipient));

  //add amount
  components.push(text(`**${`Amount(${tokenId ?? 'ETH'})`}:**`));
  components.push(copyable(amount));

  const response = await snap.request({
    method: 'snap_dialog',
    params: {
      type: DialogType.Confirmation,
      content: panel([
        heading('Do you want to sign this transaction ?'),
        ...components,
      ]),
    },
  });

  if (!response) {
    return false;
  }

  const hash = await wallet.sendMessage(tx);

  await waitTillCompleted(client, wallet.shardId, hash);

  return {
    hash,
  };
};
