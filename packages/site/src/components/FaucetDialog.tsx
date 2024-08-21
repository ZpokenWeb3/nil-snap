import { DialogTitle } from '@radix-ui/react-dialog';
import { Currency } from '@zpoken/metamask-nil-types';
import { ArrowDownToLine } from 'lucide-react';
import { useState } from 'react';
import { parseUnits } from 'viem';

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
  DialogTrigger,
} from './ui/dialog';

export const FaucetDialog = ({ currency }: { currency: Currency }) => {
  const { faucet } = useStore(walletSelector);
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
        Faucet
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Faucet</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void faucet(parseUnits(amount, currency.decimals ?? 18).toString());
          }}
        >
          <div className="flex flex-col gap-6 pb-10 pt-6">
            <InputToken
              label="Amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              maxExponent={currency.decimals ?? 18}
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
              <p>Faucet</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
