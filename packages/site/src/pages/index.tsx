import { Plus } from 'lucide-react';
import { useMemo } from 'react';

import { CurrencyTable } from '../components/CurrencyTable';
import { ScrollableTableWrapper } from '../components/ScrollableTableWrapper';
import { WalletInfo } from '../components/WalletInfo';
import { Button } from '../components/ui/button';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';

const Index = () => {
  const { selectedAccount, currencies, createCurrency } =
    useStore(walletSelector);

  const showCreateBtn = useMemo(() => {
    if (!selectedAccount) return true;
    const tokens = currencies[selectedAccount.address] ?? [];

    return Boolean(
      tokens.find(
        (i) => i.id && selectedAccount.address.includes(i.id.slice(2)),
      ),
    );
  }, [currencies, selectedAccount]);

  return (
    <div className="flex flex-col gap-[30px] h-full">
      <p className="text-[32px] leading-[30px] font-semibold">Dashboard</p>
      <WalletInfo />
      <ScrollableTableWrapper>
        <div className="flex justify-between items-center mb-10">
          <p className="text-xl leading-[30px] font-semibold">Assets</p>
          {!showCreateBtn && (
            <Button
              variant="secondary"
              className="w-[186px] flex items-center gap-3"
              onClick={() => {
                void createCurrency();
              }}
            >
              <div>
                <Plus className="size-5" />
              </div>
              <p>Add Own currency</p>
            </Button>
          )}
        </div>
        <CurrencyTable />
      </ScrollableTableWrapper>
    </div>
  );
};

export default Index;
