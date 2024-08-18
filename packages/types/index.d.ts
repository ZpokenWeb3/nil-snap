export type Address = `0x${string}`;

export type Account = {
  address: Address;
  isDeployed: boolean;
  shardId: number;
};

export type Currency = { id: string; balance: string };

export type SendRequestParams = {
  receiver: Address;
  amount: string;
  tokenId: number;
};

export type GetBalanceRequestParams = {
  userAddress: Address;
};

export enum NIL_METHODS {
  CREATE_ACCOUNT = 'nil_createAccount',
  DEPLOY_ACCOUNT = 'nil_deployAccount',
  GET_BALANCE = 'nil_getBalance',
  FAUCET = 'nil_faucet',
  GET_CURRENCIES = 'nil_getCurrencies',
  CREATE_AND_MINT = 'nil_createAndMint',
  SEND = 'nil_send',
}

export type ApiRequestParams = GetBalanceRequestParams | SendRequestParams;
