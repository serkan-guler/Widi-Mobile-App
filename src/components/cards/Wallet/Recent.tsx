import {memo} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Logo} from '../../../assets/logos';
import {scaleSize} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';
import {useTranslation} from 'react-i18next';
import {ellipsizeString, formatTimeAgo} from '../../../utils';

type Props = {
  onPress: () => void;
  mint: string;
  image?: string;
  time?: string;
  description?: string;
};

const RecentCard = ({onPress, mint, image, time, description}: Props) => {
  const {t} = useTranslation(['common']);

  return (
    <View style={styles.recentContainer}>
      <View style={[styles.recentLogoContainer, styles.imageSize]}>
        {image ? (
          <Image
            source={{uri: image}}
            style={styles.imageSize}
            resizeMode="cover"
            {...styles.imageSize}
          />
        ) : (
          <Logo
            width={scaleSize(26.5)}
            height={scaleSize(22)}
            color={COLORS.DANGER}
          />
        )}
      </View>
      <View style={styles.recentTextContainer}>
        <Text style={styles.recentWalletText}>
          {ellipsizeString(mint, 10, 10, 3)}
        </Text>
        {(time || description) && (
          <Text style={styles.recentDateText}>
            {description ? description : time ? formatTimeAgo(time) : ''}
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.choseContainer} onPress={onPress}>
        <Text style={styles.choseText}>{t('common:choose')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(RecentCard);
