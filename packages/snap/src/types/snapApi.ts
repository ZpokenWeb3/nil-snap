import type { SLIP10Node } from '@metamask/key-tree';
import type { SnapsProvider } from '@metamask/snaps-sdk';
import { ApiRequestParams } from '@zpoken/metamask-nil-types';

export type ApiParams = {
  requestParams: ApiRequestParams;
  wallet: SnapsProvider;
  keyDeriver?: SLIP10Node;
};
