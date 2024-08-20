import { Currency } from '@zpoken/metamask-nil-types';
import React from 'react';

export const CurrencyCard = ({ currency }: { currency: Currency }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="size-[30px] rounded-[22px] bg-background" />
      <p className="text-base font-semibold">{currency.name}</p>
    </div>
  );
};
