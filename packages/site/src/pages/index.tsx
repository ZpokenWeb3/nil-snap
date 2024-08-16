import { ScrollableTable } from '../components/ScrollableTable';
import { ScrollableTableWrapper } from '../components/ScrollableTableWrapper';
import { WalletInfo } from '../components/WalletInfo';

const Index = () => {
  return (
    <div className="flex flex-col gap-[30px] h-full">
      <p className="text-[32px] leading-[30px] font-semibold">Dashboard</p>
      <WalletInfo />
      <ScrollableTableWrapper>
        <div className="flex justify-between items-center mb-10">
          <p className="text-xl leading-[30px] font-semibold">Assets</p>
        </div>
        <ScrollableTable />
      </ScrollableTableWrapper>
    </div>
  );
};

export default Index;
