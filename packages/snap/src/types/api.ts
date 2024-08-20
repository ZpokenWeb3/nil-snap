import type { SLIP10Node } from '@metamask/key-tree';
import type { SnapsProvider } from '@metamask/snaps-sdk';
import { ApiRequest } from '@zpoken/metamask-nil-types';

export type ApiParams = {
  requestParams: ApiRequest;
  wallet: SnapsProvider;
};

export type ApiParamsWithKeyDeriver = ApiParams & {
  keyDeriver: SLIP10Node;
};
