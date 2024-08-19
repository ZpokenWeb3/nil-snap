import React, { KeyboardEventHandler } from 'react';

import { useWheelPrevent } from '../hooks/useWheelPrevent';
import { Input, InputProps } from './ui/input';

export const SelectedInput = ({
  label,
  maxExponent,
  ...props
}: { label: string; maxExponent?: number } & InputProps) => {
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
      <div className="rounded-lg bg-input/80 flex items-center pr-[26px]">
        <Input
          className="rounded-none rounded-l-lg bg-input/0"
          ref={inputRef}
          {...props}
          type="number"
          onKeyDown={onKeyDown}
        />
        <div className="flex items-center gap-3">
          <div className="size-[30px] rounded-[22px] bg-background" />
          <p className="text-base font-medium">ETH</p>
        </div>
      </div>
    </div>
  );
};
