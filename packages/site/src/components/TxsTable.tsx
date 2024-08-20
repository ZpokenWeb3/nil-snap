import { Account, Transaction } from '@zpoken/metamask-nil-types';
import { Check, X } from 'lucide-react';
import { formatEther } from 'viem';

import { cutAddress } from '../lib/cutAddress';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { ScrollArea } from './ui/scroll-area';

const MINTER_ADDRESS = '0001222222222222222222222222222222222222';

const getMethod = (tx: Transaction, account: Account) => {
  if (tx.method) return tx.method;

  const accountAddress = account.address.slice(2).toLowerCase();

  if (tx.from === MINTER_ADDRESS && tx.to.toLowerCase() === accountAddress) {
    return 'Bounce';
  } else if (tx.from.toLowerCase() === accountAddress) {
    return 'Transfer';
  } else if (tx.to.toLowerCase() === accountAddress) {
    return 'Refund';
  } else {
    return 'Unknown';
  }
};

export const TxsTable = () => {
  const { transactions, selectedAccount } = useStore(walletSelector);

  return (
    <ScrollArea className="grow overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-8 text-lg font-medium items-center ">
          <p className="text-left ">Hash</p>
          <p className="text-center">Status</p>
          <p className="text-center">Method</p>
          <p className="text-center">Shard + Block</p>
          <p className="text-center">From</p>
          <p className="text-center">To</p>
          <p className="text-center">Value</p>
          <p className="text-right">Fee</p>
          <div />
        </div>
        <div className="flex flex-col gap-2">
          {transactions.map((i) => (
            <div
              className="h-[66px] grid grid-cols-8 text-[12px] leading-[18px] font-medium items-center justify-center px-3 rounded-lg border-[1.3px] border-table-cell [&:nth-child(odd)]:bg-table-cell"
              key={i.hash}
            >
              <a
                href={`https://explore.nil.foundation/tx/${i.hash}`}
                target="_blank"
                className="underline text-link font-semibold"
              >
                {cutAddress(i.hash)}
              </a>
              <div className="flex justify-center items-center">
                {i.success ? (
                  <div className="flex items-center bg-success gap-[2px] justify-center py-1 px-[6px] rounded-lg text-[#1D1C21] text-sm font-medium">
                    <div>
                      <Check className="size-4" />
                    </div>
                    <p>Success</p>
                  </div>
                ) : (
                  <div className="flex items-center bg-failed gap-[2px] justify-center py-1 px-[6px] rounded-lg text-[#1D1C21] text-sm font-medium ">
                    <div>
                      <X className="size-4" />
                    </div>
                    <p>Failed</p>
                  </div>
                )}
              </div>
              <p className="text-center">{getMethod(i, selectedAccount!)}</p>
              <a
                href={`https://explore.nil.foundation/block/${i.shard_id}/${i.block_id}`}
                target="_blank"
                className="underline text-link font-semibold text-center"
              >
                {`${i.shard_id}:${i.block_id}`}
              </a>
              <a
                href={`https://explore.nil.foundation/address/${i.from.toLowerCase()}`}
                target="_blank"
                className="underline text-link font-semibold text-center"
              >
                {cutAddress(i.from)}
              </a>
              <a
                href={`https://explore.nil.foundation/address/${i.to.toLowerCase()}`}
                target="_blank"
                className="underline text-link font-semibold text-center"
              >
                {cutAddress(i.to)}
              </a>
              <p className="text-center">{`${formatEther(
                BigInt(i.value),
              )} ETH`}</p>
              <p className="text-right">{`${formatEther(
                BigInt(i.fee_credit),
              )} ETH`}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
