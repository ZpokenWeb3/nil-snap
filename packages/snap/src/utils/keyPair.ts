import { SLIP10Node } from '@metamask/key-tree';
import type { SnapsProvider } from '@metamask/snaps-sdk';

export const getAddressKeyDeriver = async (wallet: SnapsProvider) => {
  const dogecoinNode = await wallet.request({
    method: 'snap_getBip32Entropy',
    params: {
      path: ['m', "44'", "1'"],
      curve: 'secp256k1',
    },
  });

  return await SLIP10Node.fromJSON(dogecoinNode);
};
