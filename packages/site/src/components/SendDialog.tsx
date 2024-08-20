import { Send } from 'lucide-react';
import { useEffect } from 'react';

import { cn } from '../lib/utils';
import { useStore } from '../state';
import { sendSelector } from '../state/send';
import { walletSelector } from '../state/wallet';
import { InputToken } from './InputToken';
import { TextInput } from './TextInput';
import { Button, buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const SendDialog = () => {
  const {
    amount,
    recipient,
    currency,
    setAmount,
    setRecipient,
    sendTx,
    setCurrency,
  } = useStore(sendSelector);

  const { currencies, selectedAccount } = useStore(walletSelector);

  useEffect(() => {
    const all = currencies[selectedAccount?.address!];
    if (!all?.length) return;

    setCurrency(all[0]!);
  }, [currencies[selectedAccount?.address!]?.length]);

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: 'gradient',
          }),
          'w-[105px] flex items-center gap-[10px]',
        )}
      >
        <div>
          <Send className="zise-5" />
        </div>
        <p>Send</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendTx();
          }}
        >
          <div className="flex flex-col gap-6 pb-10 pt-6">
            <InputToken
              label="Amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              maxExponent={currency?.decimals ?? 100000000000000}
              selectedCurrency={currency}
              currencies={currencies[selectedAccount?.address!] ?? []}
              setCurrency={setCurrency}
            />
            <TextInput
              label="Receiver"
              placeholder="Receiver"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              className="flex items-center gap-[10px] w-[90px]"
              type="submit"
              disabled={!Number(amount) || !recipient}
            >
              <div>
                <Send className="zise-5" />
              </div>
              <p>Send</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
