import { Currency } from '@zpoken/metamask-nil-types';
import { KeyboardEventHandler } from 'react';

import { useWheelPrevent } from '../hooks/useWheelPrevent';
import { CurrencyCard } from './CurrencyCard';
import { Input, InputProps } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const InputToken = ({
  label,
  maxExponent,
  selectedCurrency,
  currencies,
  setCurrency,
  ...props
}: {
  label: string;
  maxExponent?: number;
  selectedCurrency: Currency | undefined;
  currencies: Currency[];
  setCurrency: (currency: Currency) => void;
} & InputProps) => {
  const inputRef = useWheelPrevent();

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (maxExponent === 0 && (event.key === '.' || event.key === ',')) {
      event.preventDefault();
      return;
    }

    if (
      typeof maxExponent !== 'undefined' &&
      typeof props.value === 'string' &&
      !Number.isNaN(Number(event.key))
    ) {
      const fraction = `${props.value}${event.key}`.split('.')[1]?.length;
      if (fraction && fraction > maxExponent) {
        event.preventDefault();
        return;
      }
    }
    props.onKeyDown?.(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-base font-medium">{label}</p>
      <div className="rounded-lg bg-input/80 flex items-center pr-[18px]">
        <Input
          className="rounded-none rounded-l-lg bg-input/0"
          ref={inputRef}
          {...props}
          type="number"
          onKeyDown={onKeyDown}
        />
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
      </div>
    </div>
  );
};
