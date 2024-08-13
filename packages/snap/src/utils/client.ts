import { HttpTransport, PublicClient } from '@nilfoundation/niljs';

import { NIL_RPC_ENDPOINT } from './constants';

export const client = new PublicClient({
  transport: new HttpTransport({
    endpoint: NIL_RPC_ENDPOINT,
  }),
  shardId: 1,
});
