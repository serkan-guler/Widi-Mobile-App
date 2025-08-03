import {memo} from 'react';
import {MainTabScreenProps} from '../../../../types';
import List from './List';
import {KeyboardAvoid} from '../../../../components';

const WalletScreen = (props: MainTabScreenProps<'Wallet'>) => {
  return (
    <KeyboardAvoid>
      <List {...props} />
    </KeyboardAvoid>
  );
};

export default memo(WalletScreen);
