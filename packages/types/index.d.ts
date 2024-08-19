export type Address = `0x${string}`;

export type Account = {
  address: Address;
  isDeployed: boolean;
  shardId: number;
};

export type Currency = { id: string; balance: string };

export type GetBalanceRequest = {
  userAddress: Address;
};

export type SendRequest = {
  recipient: string;
  amount: string;
  tokenId?: Address;
};

export type SendResponse = {
  hash: Address;
};

export type ApiRequest = GetBalanceRequest | SendRequest;

export type NilMethods =
  | 'nil_createAccount'
  | 'nil_deployAccount'
  | 'nil_getBalance'
  | 'nil_faucet'
  | 'nil_getCurrencies'
  | 'nil_createAndMint'
  | 'nil_send';
