import { NilMethods } from '@zpoken/metamask-nil-types';

import { defaultSnapOrigin } from '../config/snap';
import { getSnapsProvider } from './metamask';

export const request = async <T, P>(method: NilMethods, params: P) => {
  const provider = await getSnapsProvider();

  if (!provider) throw new Error('Provider is not found!');

  console.log(provider);

  return (await provider.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: params ? { method, params } : { method },
    },
  })) as T;
};
