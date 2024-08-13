export type Address = `0x${string}`;

export type Account = { account: Address; isDeployed: boolean };

export type Currency = { id: string; balance: string };
