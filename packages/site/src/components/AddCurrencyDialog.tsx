import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { CirclePlus, Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { cn } from '../lib/utils';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { InputToken } from './InputToken';
import { TextInput } from './TextInput';
import { Button, buttonVariants } from './ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export const AddCurrencyDialog = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { currencies, selectedAccount, createCurrency } =
    useStore(walletSelector);

  const hiddeCreateBtn = useMemo(() => {
    if (!selectedAccount) return true;
    const tokens = currencies[selectedAccount.address] ?? [];

    return Boolean(
      tokens.find(
        (i) => i.id && selectedAccount.address.includes(i.id.slice(2)),
      ),
    );
  }, [currencies, selectedAccount]);

  if (hiddeCreateBtn) return <></>;

  return (
    <Dialog>
      <DialogTrigger
        disabled={!selectedAccount?.isDeployed}
        className={cn(
          buttonVariants({
            variant: 'secondary',
          }),
          'w-[186px] flex items-center gap-3',
        )}
      >
        <div>
          <Plus className="size-5" />
        </div>
        <p>Add Own currency</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create currency</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void createCurrency(name, amount);
          }}
        >
          <div className="flex flex-col gap-6 pb-10 pt-6">
            <TextInput
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputToken
              label="Amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              className="flex items-center gap-[10px] w-[100px]"
              type="submit"
              disabled={!Number(amount) || !name}
            >
              <div>
                <CirclePlus className="zise-5" />
              </div>
              <p>Create</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
