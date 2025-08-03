import {memo, ReactNode} from 'react';
import {FilterProvider} from '../contexts/filter';
import {AppProvider as AppSettingProvider} from '../contexts/app';
import {WebSocketProvider} from '../contexts/socket';
import {TransactionProvider} from '../contexts/transaction';
import {WalletProvider} from '../contexts/wallet';
import {DataProvider} from '../contexts/data';

const AppProvider = ({children}: {children: ReactNode}) => {
  return (
    <AppSettingProvider>
      <FilterProvider>
        <DataProvider>
          <TransactionProvider>
            <WalletProvider>
              <WebSocketProvider>{children}</WebSocketProvider>
            </WalletProvider>
          </TransactionProvider>
        </DataProvider>
      </FilterProvider>
    </AppSettingProvider>
  );
};

export default memo(AppProvider);
