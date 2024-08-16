import { ArrowDownFromLine, Copy, User2 } from 'lucide-react';

import { ScrollableTable } from '../components/ScrollableTable';
import { ScrollableTableWrapper } from '../components/ScrollableTableWrapper';
import { WalletInfo } from '../components/WalletInfo';
import { Button } from '../components/ui/button';

const Index = () => {
  console.log([...Array(10).keys()]);

  return (
    <div className="flex flex-col gap-[30px] h-full">
      <p className="text-[32px] leading-[30px] font-semibold">Dashboard</p>
      <WalletInfo />
      <ScrollableTableWrapper>
        <p>Table</p>
        <ScrollableTable />
      </ScrollableTableWrapper>
    </div>
  );
};

export default Index;
