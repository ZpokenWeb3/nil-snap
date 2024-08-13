import type { ApiParams, GetBalanceRequestParams } from '../types/snapApi';
import { client } from './client';

export const getCurrencies = async (params: ApiParams) => {
  const { requestParams } = params;
  const { userAddress } = requestParams as GetBalanceRequestParams;

  const currencies = await client.getCurrencies(userAddress, 'latest');

  return Object.entries(currencies).map((i) => {
    return {
      id: i[0],
      balance: i[1].toString(),
    };
  });
};
