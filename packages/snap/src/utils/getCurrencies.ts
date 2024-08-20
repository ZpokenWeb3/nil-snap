import { Currency, GetCurrenciesResponse } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/api';
import { client } from './client';

export const getCurrencies = async (params: ApiParams): Promise<Currency[]> => {
  const { requestParams } = params;
  const { account } = requestParams as GetCurrenciesResponse;

  const nativeBalance = await client.getBalance(account);

  const currencies = await client.getCurrencies(account, 'latest');

  return [
    {
      decimals: 18,
      value: nativeBalance.toString(),
      name: 'ETH',
    },
    ...Object.entries(currencies).map((i, index) => {
      return {
        value: i[1].toString(),
        //TODO add name
        name: `Token${index + 1}`,
        id: i[0].toString(),
      };
    }),
  ];
};
