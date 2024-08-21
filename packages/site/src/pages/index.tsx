import { AddCurrencyDialog } from '../components/AddCurrencyDialog'
import { CurrencyTable } from '../components/CurrencyTable';
import { ScrollableTableWrapper } from '../components/ScrollableTableWrapper';
import { WalletInfo } from '../components/WalletInfo';

const Index = () => {
  return (
    <div className="flex flex-col gap-[30px] h-full">
      <p className="text-[32px] leading-[30px] font-semibold">Dashboard</p>
      <WalletInfo />
      <ScrollableTableWrapper>
        <div className="flex justify-between items-center mb-10">
          <p className="text-xl leading-[30px] font-semibold">Currencies</p>
          <AddCurrencyDialog />
        </div>
        <CurrencyTable />
      </ScrollableTableWrapper>
    </div>
  );
};

export default Index;
