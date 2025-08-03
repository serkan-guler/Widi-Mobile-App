import {memo} from 'react';
import styles from './styles';
import {Modal} from '../../../../components';
import {PoolTypes} from '../../../../types';
import {useSession} from '../../../../hooks';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  visible: boolean;
  onClose: () => void;
  wallets: {
    type: PoolTypes;
    wallet: string;
  }[];
  onSelect: (wallet: string) => void;
  showUserWallet?: boolean;
};

const WalletModal = ({
  visible,
  onClose,
  wallets,
  onSelect,
  showUserWallet = true,
}: Props) => {
  const {user} = useSession();
  const {t} = useTranslation(['common']);

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.modalContainer}>
        {wallets.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tradeButton}
            onPress={() => item.wallet && onSelect(item.wallet)}>
            <Text style={styles.tradeText}>
              {t(`common:${item.type}`)} {t('common:poolWallet')}
            </Text>
          </TouchableOpacity>
        ))}
        {showUserWallet && (
          <TouchableOpacity
            style={styles.tradeButton}
            onPress={() => user && onSelect(user.wallet)}>
            <Text style={styles.tradeText}>{t(`common:yourWallet`)}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default memo(WalletModal);
