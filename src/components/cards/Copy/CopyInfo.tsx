import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  joinDays: number;
  totalCopiers: number;
  maxCopiers: number;
};

const CopyInfoCard = ({joinDays, totalCopiers, maxCopiers}: Props) => {
  const {t} = useTranslation(['content']);

  return (
    <View style={styles.cardHeaderContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerTitle}>{t('content:joinDays')}</Text>
        <Text style={styles.headerText}>{joinDays}</Text>
      </View>
      <View style={styles.cardHeader}>
        <Text style={styles.headerTitle}>{t('content:copiers')}</Text>
        <Text style={styles.headerText}>
          {totalCopiers}
          <Text style={styles.headerTextSolid}>/{maxCopiers}</Text>
        </Text>
      </View>
    </View>
  );
};

export default memo(CopyInfoCard);
