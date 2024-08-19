import { ArrowDownFromLine, Copy, Send, User2 } from 'lucide-react';
import React from 'react';

import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { SendDialog } from './SendDialog';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export const WalletInfo = () => {
  const { toast } = useToast();
  const { selectedAccount, deploy } = useStore(walletSelector);

  return (
    <div className="bg-card mb-[10px] px-[30px] py-5 border-[0.5px] border-border rounded-lg flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="text-xl leading-[30px] font-semibold pb-[2px]">
          Main Wallet
        </p>
        <div className="flex gap-3 items-center mb-2">
          <div className="p-2 bg-background rounded-[10px]">
            <User2 className="size-6 text-icon-secondary" />
          </div>
          <p className="text-base font-medium text-text-secondary mr-1">
            {selectedAccount?.address}
          </p>
          <Button
            onClick={() => {
              void (async () => {
                await navigator.clipboard.writeText(
                  selectedAccount?.address ?? '',
                );
                toast({
                  title: 'Successfully copied!',
                });
              })();
            }}
            className="p-[5px] bg-background rounded-[10px]"
            size="icon"
          >
            <Copy className="size-5 text-icon-secondary" />
          </Button>
        </div>
        <p className="text-xl leading-[30px] font-semibold">Total Value</p>
        <p className="text-xl leading-[30px] font-semibold">$0.00</p>
      </div>
      <div className="flex gap-6">
        {!selectedAccount?.isDeployed && (
          <Button
            className="w-[105px]"
            onClick={() => {
              void deploy();
            }}
          >
            Deploy
          </Button>
        )}
        <Button variant="gradient" className="w-[105px]">
          <div className="flex items-center gap-[10px]">
            <ArrowDownFromLine className="zise-5" />
            <p>Receive</p>
          </div>
        </Button>
        <SendDialog />
      </div>
    </div>
  );
};
