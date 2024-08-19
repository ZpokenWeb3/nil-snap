import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { ApiRequest } from '@zpoken/metamask-nil-types';

import type { ApiParams } from './types/snapApi';
import { createAccount } from './utils/createAccount';
import { createAndMintCurrency } from './utils/createAndMintCurrency';
import { deployAccount } from './utils/deployAccount';
import { faucetToken } from './utils/faucet';
import { getCurrencies } from './utils/getCurrencies';
import { getAddressKeyDeriver } from './utils/keyPair';
import { send } from './utils/send';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const requestParams = request?.params as ApiRequest;

  const apiParams: ApiParams = {
    requestParams,
    wallet: snap,
  };

  switch (request.method) {
    case 'nil_createAccount':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await createAccount(apiParams);
    case 'nil_deployAccount':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await deployAccount(apiParams);
    case 'nil_faucet':
      return await faucetToken(apiParams);
    case 'nil_getCurrencies':
      return await getCurrencies(apiParams);
    case 'nil_createAndMint':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await createAndMintCurrency(apiParams);
    case 'nil_send':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await send(apiParams);
    default:
      throw new Error('Method not found.');
  }
};
