import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { CurrencyCard } from './CurrencyCard';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const CurrencyTable = () => {
  const { currencies, selectedAccount, faucet } = useStore(walletSelector);

  const tokens = currencies[selectedAccount?.address!]!;

  if (!selectedAccount?.address || !tokens || !tokens.length) return <></>;

  return (
    <ScrollArea className="grow overflow-auto">
      <Table className="border-separate border-spacing-y-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Price/24h change</TableHead>
            <TableHead className="text-center">Value</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((i) => (
            <TableRow key={i.name} className="mt-10">
              <TableCell className="rounded-bl-lg rounded-tl-lg">
                <CurrencyCard currency={i} />
              </TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">$0</TableCell>
              <TableCell className="text-center">{i.value}</TableCell>
              <TableCell className="text-right rounded-br-lg rounded-tr-lg">
                {i.name === 'ETH' && (
                  <Button
                    variant="gradient"
                    className="px-4"
                    onClick={() => {
                      void faucet();
                    }}
                  >
                    Faucet
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};