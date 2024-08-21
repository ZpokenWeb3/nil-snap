import { Currency } from '@zpoken/metamask-nil-types';
import React from 'react';

import { CurrencyCard } from './CurrencyCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const CurrencySelect = ({
  selectedCurrency,
  currencies,
  setCurrency,
}: {
  selectedCurrency: Currency | undefined;
  currencies: Currency[];
  setCurrency: (cur: Currency) => void;
}) => {
  return (
    <>
      {selectedCurrency && currencies.length && (
        <Select
          defaultValue={selectedCurrency.name ?? 'ETH'}
          onValueChange={(v) =>
            setCurrency(currencies.find((i) => i.name === v)!)
          }
        >
          <SelectTrigger className="min-w-[144px] w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="min-w-[144px] w-fit">
            {currencies.map((i) => (
              <SelectItem value={i.name} className="text-foreground">
                <CurrencyCard currency={i} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};
