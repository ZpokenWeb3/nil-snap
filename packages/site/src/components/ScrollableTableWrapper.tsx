import React, { ReactNode } from 'react';

export const ScrollableTableWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="grow bg-card flex flex-col h-full min-h-0">{children}</div>
  );
};
