import {memo} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Img} from '../../common';
import {useTranslation} from 'react-i18next';

const CopyTrader = () => {
  const {t} = useTranslation(['content', 'common']);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Img source="logo-red" style={styles.img} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{t('content:howStartCopyTrading')}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.buttonText}>{t('common:readNow')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(CopyTrader);
