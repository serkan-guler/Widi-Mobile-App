import {memo, useEffect, useState} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  Header,
  PageHeaderCard,
  ProfileImageCard,
  ScrollLayout,
} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useSession, useWebSocket} from '../../../../hooks';
import {
  ChecklistIcon,
  InfoIcon,
  LanguageIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileSecurityIcon,
  RouteMergeIcon,
  WidiCodeIcon,
  XConnectIcon,
} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {scaleSize} from '../../../../constants/dimensions';
// import {AppStackScreenProps} from '../../../../types';
import {SCREEN_NAMES} from '../../../../constants/navigation';

const ProfileScreen = () => {
  const {t} = useTranslation(['navigation', 'common']);
  const {user, logout} = useSession();
  const navigation = useAppNavigation();
  const {closeSocket} = useWebSocket();

  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    closeSocket();
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const data = [
    {
      icon: InfoIcon,
      text: t('navigation:help'),
      width: scaleSize(22),
      height: scaleSize(22),
      url: SCREEN_NAMES.APP.LANGUAGE,
    },
    {
      icon: NotificationIcon,
      text: t('navigation:notifications'),
      width: scaleSize(18),
      height: scaleSize(21),
      url: SCREEN_NAMES.APP.NOTIFICATIONS,
    },
    {
      icon: WidiCodeIcon,
      text: t('navigation:myWidiAccessCode'),
      width: scaleSize(18),
      height: scaleSize(21),
      url: SCREEN_NAMES.APP.NOTIFICATIONS,
    },
    {
      icon: ProfileSecurityIcon,
      text: t('navigation:basePrivacy'),
      width: scaleSize(20),
      height: scaleSize(20),
      url: SCREEN_NAMES.APP.PRIVACY,
    },
    {
      icon: ChecklistIcon,
      text: t('navigation:terms'),
      width: scaleSize(20),
      height: scaleSize(20),
      url: SCREEN_NAMES.APP.TERMS,
    },
    {
      icon: LanguageIcon,
      text: t('navigation:language'),
      width: scaleSize(18),
      height: scaleSize(18),
      url: SCREEN_NAMES.APP.LANGUAGE,
    },
  ];

  return (
    <ScrollLayout isLoading={isLoading}>
      {user && (
        <>
          <Header title={t('navigation:profile')} />
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <ProfileImageCard />
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>@{user.username}</Text>
                <XConnectIcon width={scaleSize(24)} height={scaleSize(24)} />
              </View>
              {user.bio && <Text style={styles.headerBio}>{user.bio}</Text>}
              <View style={styles.editButtonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    navigation.navigate(SCREEN_NAMES.APP.EDIT_PROFILE);
                  }}>
                  <Text style={styles.editButtonText}>
                    {t('common:edit', {name: t('navigation:profile')})}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <PageHeaderCard title={t('common:settings')} />
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.navigationContainer, styles.baseContainer]}
                  onPress={() => navigation.navigate(item.url)}>
                  <View
                    style={[
                      styles.icon,
                      styles.baseIcon,
                      styles.leadingContainer,
                    ]}>
                    <item.icon
                      color={COLORS.WHITE}
                      width={item.width}
                      height={item.height}
                    />
                  </View>
                  <Text style={styles.navigationText}>{item.text}</Text>
                  <View
                    style={[
                      styles.icon,
                      styles.baseIcon,
                      styles.trailingContainer,
                    ]}>
                    <RouteMergeIcon
                      color={COLORS.WHITE}
                      width={scaleSize(15)}
                      height={scaleSize(11)}
                    />
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.navigationContainer, styles.dangerContainer]}
                onPress={handleLogout}>
                <View
                  style={[
                    styles.icon,
                    styles.leadingContainer,
                    styles.dangerIcon,
                  ]}>
                  <LogoutIcon
                    color={COLORS.DANGER}
                    width={scaleSize(20)}
                    height={scaleSize(20)}
                  />
                </View>
                <Text style={[styles.navigationText, {color: COLORS.DANGER}]}>
                  {t('navigation:logout')}
                </Text>
                <View
                  style={[
                    styles.icon,
                    styles.trailingContainer,
                    styles.dangerIcon,
                  ]}>
                  <RouteMergeIcon
                    color={COLORS.DANGER}
                    width={scaleSize(15)}
                    height={scaleSize(11)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollLayout>
  );
};

export default memo(ProfileScreen);
