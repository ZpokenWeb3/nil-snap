import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { ApiRequest, NilMethods } from '@zpoken/metamask-nil-types';

import { createAccount } from './utils/createAccount';
import { createCurrency } from './utils/createCurrency';
import { deployAccount } from './utils/deployAccount';
import { faucetToken } from './utils/faucet';
import { getCurrencies } from './utils/getCurrencies';
import { getAddressKeyDeriver } from './utils/keyPair';
import { mint } from './utils/mint';
import { send } from './utils/send';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const requestParams = request?.params as ApiRequest;

  const apiParams = {
    requestParams,
    wallet: snap,
  };

  const method = request.method as NilMethods;

  switch (method) {
    // Public methods without keyDeriver
    case 'nil_faucet':
      return await faucetToken(apiParams);
    case 'nil_getCurrencies':
      return await getCurrencies(apiParams);

    // Private methods should include keyDeriver
    case 'nil_createAccount':
      return await createAccount({
        ...apiParams,
        keyDeriver: await getAddressKeyDeriver(snap),
      });
    case 'nil_deployAccount':
      return await deployAccount({
        ...apiParams,
        keyDeriver: await getAddressKeyDeriver(snap),
      });
    case 'nil_createCurrency':
      return await createCurrency({
        ...apiParams,
        keyDeriver: await getAddressKeyDeriver(snap),
      });
    case 'nil_send':
      return await send({
        ...apiParams,
        keyDeriver: await getAddressKeyDeriver(snap),
      });
    case 'nil_mint':
      return await mint({
        ...apiParams,
        keyDeriver: await getAddressKeyDeriver(snap),
      });
    default:
      throw new Error('Method not found.');
  }
};
