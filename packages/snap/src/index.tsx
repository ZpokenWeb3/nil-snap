import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';

import type { ApiParams, ApiRequestParams } from './types/snapApi';
import type { SnapState } from './types/snapState';
import { createAccount } from './utils/createAccount';
import { createAndMintCurrency } from './utils/createAndMintCurrency';
import { deployAccount } from './utils/deployAccount';
import { faucetToken } from './utils/faucet';
import { getBalance } from './utils/getBalance';
import { getCurrencies } from './utils/getCurrencies';
import { getAddressKeyDeriver } from './utils/keyPair';
import { mintToAddress } from './utils/mintToAddress';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const requestParams = request?.params as ApiRequestParams;
  let state = (await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  })) as SnapState;

  if (!state) {
    state = {
      accContracts: [],
    };
    // initialize state if empty and set default data
    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: state,
      },
    });
  }

  const apiParams = {
    state,
    requestParams,
    wallet: snap,
  } as ApiParams;

  switch (request.method) {
    case 'nill_createAccount':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await createAccount(apiParams);
    case 'nill_deployAccount':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await deployAccount(apiParams);
    case 'nill_getBalance':
      return await getBalance(apiParams);
    case 'nill_faucet':
      return await faucetToken(apiParams);
    case 'nill_getCurrencies':
      return await getCurrencies(apiParams);
    case 'nill_createAndMint':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await createAndMintCurrency(apiParams);
    case 'nill_mintToAddress':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return await mintToAddress(apiParams);
    default:
      throw new Error('Method not found.');
  }
};
