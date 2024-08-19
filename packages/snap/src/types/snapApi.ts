import type { SLIP10Node } from '@metamask/key-tree';
import type { SnapsProvider } from '@metamask/snaps-sdk';
import { ApiRequest } from '@zpoken/metamask-nil-types';

export type ApiParams = {
  requestParams: ApiRequest;
  wallet: SnapsProvider;
  keyDeriver?: SLIP10Node;
};
