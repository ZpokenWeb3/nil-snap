import { formatUnits } from 'viem';

import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { CurrencyCard } from './CurrencyCard';
import { FaucetDialog } from './FaucetDialog';
import { MintDialog } from './MintDialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export const CurrencyTable = () => {
  const { currencies, selectedAccount } = useStore(walletSelector);

  const tokens = currencies[selectedAccount?.address!]!;

  if (!selectedAccount?.address || !tokens || !tokens.length) return <></>;

  return (
    <ScrollArea className="grow overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="h-6 grid grid-cols-5 text-lg font-medium items-center ">
          <p className="text-left ">Name</p>
          <p className="text-center">Price/24h change</p>
          <p className="text-center">Value</p>
          <p className="text-center">Amount</p>
          <div />
        </div>
        <div className="flex flex-col gap-2">
          {tokens.map((i) => (
            <div
              className="h-[66px] grid grid-cols-5 text-sm font-semibold items-center px-3 rounded-lg border-[1.3px] border-table-cell [&:nth-child(odd)]:bg-table-cell"
              key={i.name}
            >
              <p className="text-left">
                <CurrencyCard currency={i} />
              </p>
              <p className="text-center">-</p>
              <p className="text-center">$0.00</p>
              <p className="text-center">
                {i.decimals
                  ? formatUnits(BigInt(i.value), i.decimals)
                  : i.value}
              </p>
              <div className="text-right">
                {i.name === 'ETH' && <FaucetDialog currency={i} />}
                {i.id && selectedAccount.address.includes(i.id.slice(2)) && (
                  <MintDialog currency={i} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
