import { SLIP10Node } from '@metamask/key-tree';

export const getPrivateKey = async (keyDeriver?: SLIP10Node) => {
  if (!keyDeriver) {
    throw new Error('KeyDeriver wasn`t found!');
  }

  const accountKey = await keyDeriver.derive(["bip32:0'"]);

  const { privateKey } = accountKey;

  if (!privateKey) {
    throw new Error('Private key wasn`t found!');
  }

  return privateKey;
};