import {memo, useMemo} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {InfoPrimaryIcon} from '../../../../assets/icons';
import {scaleSize} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';

type Props = {
  networkFee: number;
  priceImpact: number;
};

const InfoText = ({priceImpact, networkFee}: Props) => {
  const {t} = useTranslation(['content']);

  const fee = useMemo(
    () => (networkFee <= 0.01 ? '<$0.01' : `$${networkFee.toFixed(2)}`),
    [networkFee],
  );

  const infoOptions = useMemo(
    () => [
      `${t('content:networkFee')}: ${fee}`,
      `${t('content:platformFee')}: 1`,
      `${t('content:priceImpact')}: ${priceImpact.toFixed(1) ?? 0}`,
    ],
    [t, priceImpact, fee],
  );

  return infoOptions.map((option, index) => (
    <View key={index} style={styles.infoTextContainer}>
      <Text style={[styles.infoText, styles.fontMedium]}>
        {option}
        {index > 0 && <Text style={[styles.infoText, styles.fontNeue]}>%</Text>}
      </Text>
      <InfoPrimaryIcon
        width={scaleSize(13.33)}
        height={scaleSize(13.33)}
        containerColor={'#676A6F'}
        iconColor={COLORS.WHITE}
      />
    </View>
  ));
};

export default memo(InfoText);
