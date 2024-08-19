export type Address = `0x${string}`;

export type Account = {
  address: Address;
  isDeployed: boolean;
  shardId: number;
};

export type Currency = {
  decimals?: number;
  value: string;
  name: string;
  id?: string;
};

export type GetCurrenciesResponse = {
  account: Address;
};

export type FaucetResponse = {
  account: Address;
};

export type SendRequest = {
  recipient: string;
  amount: string;
  tokenId?: Address;
};

export type SendResponse = {
  hash: Address;
};

export type CreateCurrencyRequest = {
  amount: string;
  name: string;
};

export type MintRequest = {
  amount: string;
};

export type ApiRequest =
  | GetCurrenciesResponse
  | SendRequest
  | CreateCurrencyRequest
  | MintRequest;

export type NilMethods =
  | 'nil_createAccount'
  | 'nil_deployAccount'
  | 'nil_faucet'
  | 'nil_getCurrencies'
  | 'nil_createCurrency'
  | 'nil_send'
  | 'nil_mint';
