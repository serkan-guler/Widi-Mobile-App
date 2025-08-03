import {memo} from 'react';
import styles from './styles';
import {ActivityIndicator, Text, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {useTranslation} from 'react-i18next';

type Props = {
  text?: string;
};

const Loading = ({text}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={COLORS.PRIMARY} />
      <Text style={styles.loadingText}>{text || t('loading')}</Text>
    </View>
  );
};

export default memo(Loading);
