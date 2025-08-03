import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {Logo} from '../../../assets/logos';
import {scaleSize} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';
import {ellipsizeString} from '../../../utils';
import {useTranslation} from 'react-i18next';

type Props = {
  to: string;
};

const SendingToCard = ({to}: Props) => {
  const {t} = useTranslation(['common']);

  return (
    <View style={styles.container}>
      <View style={styles.widiContainer}>
        <Logo
          width={scaleSize(20.45)}
          height={scaleSize(16.95)}
          color={COLORS.DANGER}
        />
      </View>
      <Text style={styles.sendingToText}>{t('common:sendingTo')}</Text>
      <Text style={styles.sendingToAddressText}>
        {ellipsizeString(to, 4, 4)}
      </Text>
    </View>
  );
};

export default memo(SendingToCard);
