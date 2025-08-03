import {memo, useMemo} from 'react';
import styles from './styles';
import {Modal} from '../../../../components';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSession} from '../../../../hooks';
import {copyToClipboard, ellipsizeString} from '../../../../utils';

type Props = {
  visible: boolean;
  onClose: () => void;
  widiName?: string;
};

const ReceiveModal = ({visible, onClose, widiName}: Props) => {
  const {t} = useTranslation(['common']);
  const {user} = useSession();

  const handleCopy = (text: string) => {
    copyToClipboard(text);
    onClose();
  };

  const name = useMemo(() => {
    if (widiName) {
      return widiName.endsWith('.widi')
        ? `${widiName}.sol`
        : widiName.endsWith('.widi.sol')
          ? widiName
          : `${widiName}.widi.sol`;
    }
    return '';
  }, [widiName]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <Text style={styles.receiveModalTitleText}>{t('common:receive')}</Text>
      {user && (
        <View style={styles.receiveModalContainer}>
          <View
            style={[styles.modalItemContainer, styles.modalItemContainerDark]}>
            <Text style={[styles.modalItemText, styles.modalItemTextWhite]}>
              {ellipsizeString(user.wallet, 10, 10, 3)}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.modalItemContainer,
              styles.modalItemContainerPrimary,
            ]}
            onPress={() => handleCopy(user.wallet)}>
            <Text style={[styles.modalItemText, styles.modalItemTextDark]}>
              {t('common:copy')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {widiName && (
        <View style={styles.receiveModalContainer}>
          <View
            style={[styles.modalItemContainer, styles.modalItemContainerDark]}>
            <Text style={[styles.modalItemText, styles.modalItemTextWhite]}>
              {name}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.modalItemContainer,
              styles.modalItemContainerPrimary,
            ]}
            onPress={() => handleCopy(name)}>
            <Text style={[styles.modalItemText, styles.modalItemTextDark]}>
              {t('common:copy')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};

export default memo(ReceiveModal);
