import React, { ReactNode } from 'react';

export const ScrollableTableWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="grow bg-card flex flex-col h-full min-h-0 border-[0.5px] border-border-secondary rounded-lg px-[30px] pt-[30px] pb-[26px]">
      {children}
    </div>
  );
};
