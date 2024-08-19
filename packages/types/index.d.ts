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

export type ApiRequestParams = GetBalanceRequestParams | SendRequestParams;

export type NilMethods =
  | 'nil_createAccount'
  | 'nil_deployAccount'
  | 'nil_getBalance'
  | 'nil_faucet'
  | 'nil_getCurrencies'
  | 'nil_createAndMint'
  | 'nil_send';
