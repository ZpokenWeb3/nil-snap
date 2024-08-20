import { useEffect } from 'react';

import { ScrollableTableWrapper } from '../components/ScrollableTableWrapper';
import { TxsTable } from '../components/TxsTable';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';

const About = () => {
  const { selectedAccount, getTransactions } = useStore(walletSelector);

  useEffect(() => {
    if (!selectedAccount) return;

    void (async () => {
      await getTransactions();
    })();
  }, [selectedAccount]);

  return (
    <div className="flex flex-col gap-[30px] h-full">
      <p className="text-[32px] leading-[30px] font-semibold">Transactions</p>
      <ScrollableTableWrapper>
        <div className="flex justify-between items-center mb-10">
          <p className="text-xl leading-[30px] font-semibold">
            Transactions history
          </p>
        </div>
        <TxsTable />
      </ScrollableTableWrapper>
    </div>
  );
};

export default About;
