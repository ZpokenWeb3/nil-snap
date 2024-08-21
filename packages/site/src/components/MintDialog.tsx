import { Currency } from '@zpoken/metamask-nil-types';
import { ArrowDownToLine } from 'lucide-react';
import { useState } from 'react';

import { cn } from '../lib/utils';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { CurrencyCard } from './CurrencyCard';
import { InputToken } from './InputToken';
import { Button, buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const MintDialog = ({ currency }: { currency: Currency }) => {
  const { mint } = useStore(walletSelector);
  const [amount, setAmount] = useState('');

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: 'gradient',
            size: 'sm',
          }),
          'w-[100px]',
        )}
      >
        Mint
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mint</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void mint(amount);
          }}
        >
          <div className="flex flex-col gap-6 pb-10 pt-6">
            <InputToken
              label="Amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              maxExponent={18}
              children={<CurrencyCard currency={currency} />}
            />
          </div>
          <DialogFooter>
            <Button
              className="flex items-center gap-[10px] w-[100px]"
              type="submit"
              disabled={!Number(amount)}
            >
              <div>
                <ArrowDownToLine className="zise-5" />
              </div>
              <p>Mint</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
