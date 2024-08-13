export type AccContract = {
  addressSalt: string;
  publicKey: string; // in hex
  address: string; // in hex
  addressIndex: number;
  derivationPath: string;
  deployTxnHash: string; // in hex
  chainId: string; // in hex
  upgradeRequired?: boolean;
  deployRequired?: boolean;
};

export type SnapState = {
  accContracts: AccContract[];
};
