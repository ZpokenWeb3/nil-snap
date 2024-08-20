import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { CurrencyCard } from './CurrencyCard';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export const CurrencyTable = () => {
  const { currencies, selectedAccount, faucet, mint } =
    useStore(walletSelector);

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
              <p className="text-center">{i.value}</p>
              <div className="text-right">
                {i.name === 'ETH' && (
                  <Button
                    variant="gradient"
                    className="w-[100px]"
                    size="sm"
                    onClick={() => {
                      void faucet();
                    }}
                  >
                    Faucet
                  </Button>
                )}
                {i.id && selectedAccount.address.includes(i.id.slice(2)) && (
                  <Button
                    variant="gradient"
                    className="w-[100px]"
                    size="sm"
                    onClick={() => {
                      void mint();
                    }}
                  >
                    Mint
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Table className="border-separate border-spacing-y-4">
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
                    className="w-[100px]"
                    onClick={() => {
                      void faucet();
                    }}
                  >
                    Faucet
                  </Button>
                )}
                {i.id && selectedAccount.address.includes(i.id.slice(2)) && (
                  <Button
                    variant="gradient"
                    className="w-[100px]"
                    onClick={() => {
                      void mint();
                    }}
                  >
                    Mint
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </ScrollArea>
  );
};
