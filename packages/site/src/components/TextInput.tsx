import React from 'react';

import { Input, InputProps } from './ui/input';

export const TextInput = ({
  label,
  ...props
}: { label: string } & InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-base font-medium">{label}</p>
      <Input {...props} />
    </div>
  );
};
