import { Account, Transaction } from '@zpoken/metamask-nil-types';
import { Check, X } from 'lucide-react';

import { cutAddress } from '../lib/cutAddress';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { ScrollArea } from './ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const MINTER_ADDRESS = '0001222222222222222222222222222222222222';

type Transfer = {
  block_hash: '17D0A89AE0BA6E0FA466658C9B537786C2DA824ADC86FF51BDBE1104888EAC57';
  block_id: 521408;
  fee_credit: '1000000';
  flags: 1;
  from: '0001708EF492A5B577EBAF08CC1553466E67D0D3'; //own
  gas_used: 55;
  hash: '085CA6AC4CB67140C1CE5311EA22AC9F8CFA9C70A51EE59318B40943B526B66E';
  method: '';
  outgoing: false;
  seqno: 9;
  shard_id: 3;
  success: true;
  timestamp: '0';
  to: '000382B3988C9D6C95827665E35C7D18BE6C39B7'; //another
  value: '0';
};

type Refund = {
  block_hash: '10D3DCB180D13CF9EF100458A62334A54B8F9336564BA9843A89978868BAE8CC';
  block_id: 548155;
  fee_credit: '0';
  flags: 5;
  from: '00017F21F0C152A483383FD439A34B6D93E7A274'; //another
  gas_used: 0;
  hash: '086C7BB746B4166EC2A0885C288F3E5DC8F341892A734B2A638CA74602A7DE83';
  method: '';
  outgoing: false;
  seqno: 4;
  shard_id: 1;
  success: true;
  timestamp: '0';
  to: '0001708EF492A5B577EBAF08CC1553466E67D0D3'; //own
  value: '999450';
};

type Bounce = {
  block_hash: '04ADB032838F5952484975A9A69D04DA9CE0498D5E58DAF2C3E5E4842CA3AA3E';
  block_id: 548021;
  fee_credit: '969040';
  flags: 9;
  from: '0001222222222222222222222222222222222222'; //MINTER_ADDRESS
  gas_used: 490;
  hash: '0E55EEE6E3DBA9409C1C72E2C43C9C9399BE70125F4A5EC08C259B8FE031F876';
  method: 'E2F5DF8C';
  outgoing: false;
  seqno: 635;
  shard_id: 1;
  success: true;
  timestamp: '0';
  to: '0001708EF492A5B577EBAF08CC1553466E67D0D3'; //own
  value: '100000000';
};

type Deploy = {
  block_hash: '19DCF7EB9C1E5C8F71DCAF20C434F135E9F4DBEE8090099991EC556261666881';
  block_id: 518567;
  fee_credit: '5000000';
  flags: 2;
  from: '0001708EF492A5B577EBAF08CC1553466E67D0D3';
  gas_used: 63252;
  hash: '3014A8B2F489FAA5BE37319764BB6EC050E8E431F68F2F85CF4989A1B5137F8F';
  method: '60806040'; // deploy
  outgoing: false;
  seqno: 0;
  shard_id: 1;
  success: true;
  timestamp: '0';
  to: '0001708EF492A5B577EBAF08CC1553466E67D0D3'; //own
  value: '0';
};

const getMethod = (tx: Transaction, account: Account) => {
  if (tx.method) return tx.method;

  const accountAddress = account.address.slice(2).toLowerCase();

  console.log(accountAddress);
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
      <Table className="border-separate border-spacing-y-4">
        <TableHeader>
          <TableRow>
            <TableHead>Hash</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Method</TableHead>
            <TableHead className="text-center">Shard + Block</TableHead>
            <TableHead className="text-center">From</TableHead>
            <TableHead className="text-center">To</TableHead>
            <TableHead className="text-center">Value</TableHead>
            <TableHead className="text-right">Fee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((i) => (
            <TableRow key={i.hash} className="mt-10">
              <TableCell className="rounded-bl-lg rounded-tl-lg">
                <a
                  href={`https://explore.nil.foundation/tx/${i.hash}`}
                  target="_blank"
                  className="underline text-link"
                >
                  {cutAddress(i.hash)}
                </a>
              </TableCell>
              <TableCell className="text-center">
                {i.success ? (
                  <div className="flex items-center bg-success gap-[2px] justify-center py-1 px-[6px] rounded-lg text-[#1D1C21] text-sm font-medium">
                    <Check className="size-4" />
                    <p>Success</p>
                  </div>
                ) : (
                  <div className="flex items-center bg-failed gap-[2px] justify-center py-1 px-[6px] rounded-lg text-[#1D1C21] text-sm font-medium">
                    <X className="size-4" />
                    <p>Failed</p>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-center">
                {getMethod(i, selectedAccount!)}
              </TableCell>
              <TableCell className="text-center">
                <a
                  href={`https://explore.nil.foundation/block/${i.shard_id}/${i.block_id}`}
                  target="_blank"
                  className="underline text-link"
                >
                  {`${i.shard_id}:${i.block_id}`}
                </a>
              </TableCell>
              <TableCell className="text-center">
                <a
                  href={`https://explore.nil.foundation/address/${i.from}`}
                  target="_blank"
                  className="underline text-link"
                >
                  {cutAddress(i.from)}
                </a>
              </TableCell>
              <TableCell className="text-center">
                <a
                  href={`https://explore.nil.foundation/address/${i.to}`}
                  target="_blank"
                  className="underline text-link"
                >
                  {cutAddress(i.to)}
                </a>
              </TableCell>
              <TableCell className="text-center">{`${i.value} ETH`}</TableCell>
              <TableCell className="text-right rounded-br-lg rounded-tr-lg">
                {`${i.fee_credit} ETH`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
