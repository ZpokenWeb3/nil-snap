import React from 'react';

import { ScrollArea } from './ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const ScrollableTable = () => {
  return (
    <ScrollArea className="grow overflow-auto">
      <Table className='border-separate border-spacing-y-4'>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Price/24h change</TableHead>
            <TableHead className="text-center">Value</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-right">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(100).keys()].map((i) => (
            <TableRow key={i} className='mt-10'>
              <TableCell className="rounded-bl-lg rounded-tl-lg">{i}</TableCell>
              <TableCell className="text-center">{i}</TableCell>
              <TableCell className="text-center">{i}</TableCell>
              <TableCell className="text-center">{i}</TableCell>
              <TableCell className="text-right rounded-br-lg rounded-tr-lg">
                {i}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
