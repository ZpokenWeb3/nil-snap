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

export type FaucetRequest = {
  account: Address;
  amount: string;
};

export type SendRequest = {
  recipient: string;
  amount: string;
  tokenId?: string;
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

export type Transaction = {
  block_hash: string;
  block_id: number;
  fee_credit: string;
  flags: number;
  from: string;
  gas_used: number;
  hash: string;
  method: string;
  outgoing: boolean;
  seqno: number;
  shard_id: number;
  success: true;
  timestamp: string;
  to: string;
  value: string;
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
  | 'nil_mint'
  | 'nil_getTransactions';
