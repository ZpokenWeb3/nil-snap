import { GetCurrenciesResponse, Transaction } from '@zpoken/metamask-nil-types';

import type { ApiParams } from '../types/api';

export const getTransactions = async (
  params: ApiParams,
): Promise<Transaction[]> => {
  const { requestParams } = params;
  const { account } = requestParams as GetCurrenciesResponse;

  const batch = 1;
  const address = account.slice(2);
  const offset = 0;
  const limit = 500;

  // Create the input JSON object
  const input = JSON.stringify({
    '0': {
      address: address,
      offset: offset,
      limit: limit,
    },
  });

  const data = await (
    await fetch(
      `https://explore.nil.foundation/api/transactions.transactionsByAddress?batch=${batch}&input=${encodeURIComponent(
        input,
      )}`,
    )
  ).json();

  return data[0].result.data;
};
