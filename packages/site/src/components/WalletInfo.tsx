import { ArrowDownFromLine, Copy, Send, User2 } from 'lucide-react';
import React from 'react';

import { Button } from './ui/button';

export const WalletInfo = () => {
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
            3cJRcLKRU2bqfmePFuipbWuVpnQwUBSW9WDzbW38U1V5
          </p>
          <div className="p-[5px] bg-background rounded-[10px] cursor-pointer">
            <Copy className="size-5 text-icon-secondary" />
          </div>
        </div>
        <p className="text-xl leading-[30px] font-semibold">Total Value</p>
        <p className="text-xl leading-[30px] font-semibold">$23.456</p>
      </div>
      <div className="flex gap-6">
        <Button className="w-[105px]">Deploy</Button>
        <Button variant="gradient" className="w-[105px]">
          <div className="flex items-center gap-[10px]">
            <ArrowDownFromLine className="zise-5" />
            <p>Receive</p>
          </div>
        </Button>
        <Button variant="gradient" className="w-[105px]">
          <div className="flex items-center gap-[10px]">
            <Send className="zise-5" />
            <p>Send</p>
          </div>
        </Button>
      </div>
    </div>
  );
};
