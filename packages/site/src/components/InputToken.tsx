import { KeyboardEventHandler, ReactNode } from 'react';

import { useWheelPrevent } from '../hooks/useWheelPrevent';
import { Input, InputProps } from './ui/input';

export const InputToken = ({
  label,
  maxExponent,
  children,
  ...props
}: {
  label: string;
  maxExponent?: number;
  children?: ReactNode;
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
      <div className="rounded-lg bg-input flex items-center pr-[18px] border-[1.3px] border-border-secondary">
        <Input
          className="rounded-none rounded-l-lg bg-input/0 border-0"
          ref={inputRef}
          {...props}
          type="number"
          onKeyDown={onKeyDown}
        />
        {children}
      </div>
    </div>
  );
};
