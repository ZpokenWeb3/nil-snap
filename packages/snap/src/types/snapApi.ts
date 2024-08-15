import type { SLIP10Node } from '@metamask/key-tree';
import type { SnapsProvider } from '@metamask/snaps-sdk';

import type { SnapState } from './snapState';

export type BaseRequestParams = {
  chainId?: string;
  debugLevel?: string;
};

export type GetBalanceRequestParams = {
  userAddress: `0x${string}`;
} & BaseRequestParams;

export type MintToAddressRequestParams = {
  receiver: `0x${string}`;
  amount: string;
} & BaseRequestParams;

export type ApiRequestParams =
  | GetBalanceRequestParams
  | MintToAddressRequestParams;

export type ApiParams = {
  state: SnapState;
  requestParams: ApiRequestParams;
  wallet: SnapsProvider;
  keyDeriver?: SLIP10Node;
};