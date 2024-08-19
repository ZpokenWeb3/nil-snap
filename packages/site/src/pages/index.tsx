import { CurrencyTable } from '../components/CurrencyTable';
import { ScrollableTableWrapper } from '../components/ScrollableTableWrapper';
import { WalletInfo } from '../components/WalletInfo';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';

const Index = () => {
  const { currencies } = useStore(walletSelector);

  console.log({ currencies });

  return (
    <div className="flex flex-col gap-[30px] h-full">
      <p className="text-[32px] leading-[30px] font-semibold">Dashboard</p>
      <WalletInfo />
      <ScrollableTableWrapper>
        <div className="flex justify-between items-center mb-10">
          <p className="text-xl leading-[30px] font-semibold">Assets</p>
        </div>
        <CurrencyTable />
      </ScrollableTableWrapper>
    </div>
  );
};

export default Index;
