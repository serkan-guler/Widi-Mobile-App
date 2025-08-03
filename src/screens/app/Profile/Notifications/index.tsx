import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {
  Header,
  NotificationCard,
  PageHeaderCard,
  ScrollLayout,
} from '../../../../components';
import {AppStackScreenProps} from '../../../../types';
import {useTranslation} from 'react-i18next';

const NotificationsScreen = ({
  navigation,
}: AppStackScreenProps<'Notifications'>) => {
  const {t} = useTranslation(['navigation', 'content']);

  return (
    <ScrollLayout>
      <Header
        title={t('navigation:notifications')}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <PageHeaderCard
          title={
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>{t('content:today')}</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>4</Text>
              </View>
            </View>
          }
        />
        <View style={styles.notificationsContainer}>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </View>
        <View style={styles.notificationsContainer}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>{t('content:yesterday')}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </View>
      </View>
    </ScrollLayout>
  );
};

export default memo(NotificationsScreen);
