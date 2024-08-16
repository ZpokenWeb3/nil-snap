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
      <Table>
        <TableHeader className="sticky top-0 bg-secondary">
          <TableRow>
            <TableHead>asd</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(100).keys()].map((i) => (
            <TableRow key={i}>
              <TableCell>{i}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
