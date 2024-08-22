# Nil snap documentation

This repository demonstrates how to create an account using a wallet provider that supports the `wallet_invokeSnap` method. This code interacts with a MetaMask Snap to create an account and retrieve account details.

## Prerequisites

- [MetaMask Flask](https://metamask.io/flask/)
- Node.js installed
- Familiarity with TypeScript

## Installation

### Install dependencies and start:

```shell
yarn install && yarn start
```

## Methods

### Create Account

To create an account, you can use the following code snippet:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: { method: 'nil_createAccount' },
  },
});
```

#### Response

- address: The generated account address.
- isDeployed: A boolean indicating whether the account is deployed.
- shardId: The shard ID of the account.

### Request Funds from Faucet

Once you have created an account, you can request funds from a faucet using the following code:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: {
      method: 'nil_faucet',
      params: {
        account,
        amount,
      },
    },
  },
});
```

#### Parameters

- account: The address of the account.
- amount: The amount of funds to request from the faucet.

### Deploy the Account

After creating the account, you can deploy it using the following code:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: { method: 'nil_deployAccount' },
  },
});
```

Deploying the account is essential to making it active on the network.

### Create a Custom Currency

Once your account is deployed, you can create a custom currency using the following code:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: {
      method: 'nil_createCurrency',
      params: {
        name,
        amount,
      },
    },
  },
});
```

#### Parameters

- name: The name of the currency to be created.
- amount: The initial amount of the currency to be issued.

### Mint Own Currency

Once your currency is created, you can mint it using the following code:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: {
      method: 'nil_mint',
      params: {
        amount,
      },
    },
  },
});
```

#### Parameters

- amount: The amount of the currency to be minted.

### Get Currencies of Address

To retrieving currencies associated with an account using the following code:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: {
      method: 'nil_getCurrencies',
      params: {
        account,
      },
    },
  },
});
```

#### Parameters

- account: The address of the account for which to retrieve the list of currencies.

#### Response (array)

- decimals: The number of decimal places for the currency.
- value: The balance of the currency as a string.
- name: The name of the currency.
- id: The id of the currency.

### Get Transactions of Address

To retrieving transactions associated with an account using the following code:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: {
      method: 'nil_getTransactions',
      params: {
        account,
      },
    },
  },
});
```

#### Parameters

- account: The address of the account for which to retrieve the list of currencies.

#### Response (array)

- block_hash: The hash of the block containing the transaction.
- block_id: The ID of the block containing the transaction.
- fee_credit: The fee credited for the transaction.
- flags: Transaction-specific flags.
- from: The address from which the transaction originated.
- gas_used: The amount of gas used in the transaction.
- hash: The hash of the transaction.
- method: The method name associated with the transaction.
- outgoing: A boolean indicating if the transaction is outgoing.
- seqno: The sequence number of the transaction.
- shard_id: The shard ID where the transaction occurred.
- success: A boolean indicating whether the transaction was successful.
- timestamp: The timestamp when the transaction was processed.
- to: The recipient address of the transaction.
- value: The value of the transaction.

### Send Currency

You can send currency using the following code:

```ts
await provider.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:8080',
    request: {
      method: 'nil_send',
      params: {
        recipient,
        amount,
        tokenId,
      },
    },
  },
});
```

#### Parameters

- recipient: The address of the recipient to whom the transaction will be sent.
- amount: The amount to be sent, typically as a string representing the value in the smallest unit (e.g., wei for ETH).
- tokenId: The ID of the token being sent, such as custom token (optional, only for custom currency).
