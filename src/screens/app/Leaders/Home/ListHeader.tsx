import {memo} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  BaseButton,
  CopyTraderCard,
  IconButton,
  PageHeaderCard,
  PageLoading,
} from '../../../../components';
import {NotificationIcon, SearchIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {scaleSize} from '../../../../constants/dimensions';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {useTranslation} from 'react-i18next';
import {useSession} from '../../../../hooks';
import {MainTabScreenProps, PortfolioKeyType} from '../../../../types';

type Props = MainTabScreenProps<'Leader'> & {
  activeTab: PortfolioKeyType;
  onTabPress: (key: PortfolioKeyType) => void;
  havePortfolio: boolean;
};

const ListHeader = ({
  navigation,
  activeTab,
  onTabPress,
  havePortfolio,
}: Props) => {
  const {t} = useTranslation(['content', 'navigation', 'common']);
  const {user} = useSession();

  //   const labelNames = labels.map(label => t(`common:${label}`));
  const labelNames = [
    {key: 'trend', label: t('common:trend'), padding: 24},
    {key: 'mostCopied', label: t('common:mostCopied'), padding: 20},
    {key: 'favorites', label: t('common:favorites'), padding: 16},
  ];

  if (!user) {
    return <PageLoading />;
  }

  return (
    <View style={styles.container}>
      {/* User Information */}
      <View style={styles.header}>
        <Image
          source={{uri: user.profilePicture}}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userWelcome}>{t('content:welcomeAgain')}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>
        {/* <IconButton
          onPress={() =>
            navigation.getParent()?.navigate(SCREEN_NAMES.APP.NOTIFICATIONS)
          }>
          <NotificationIcon
            color={COLORS.WHITE}
            width={scaleSize(18)}
            height={scaleSize(21)}
          />
        </IconButton> */}
      </View>
      {/* Copy Card */}
      <View style={styles.copyCardContainer}>
        <CopyTraderCard />
        <BaseButton
          label={t(
            havePortfolio
              ? 'navigation:viewMyLeaderPortfolio'
              : 'navigation:beALeader',
          )}
          onPress={() =>
            havePortfolio
              ? navigation.navigate('Portfolio')
              : navigation.getParent()?.navigate(SCREEN_NAMES.APP.BE_A_LEADER)
          }
        />
      </View>
      <View style={styles.pageTitleContainer}>
        <PageHeaderCard title={t('common:tradingLeaders')} />
      </View>
      <TouchableOpacity style={styles.searchContainer}>
        <SearchIcon
          width={scaleSize(16.98)}
          height={scaleSize(16.68)}
          color={COLORS.WHITE}
        />
        <Text style={styles.searchText}>{t('content:searchFavTrader')}</Text>
      </TouchableOpacity>
      <View style={styles.tabContainer}>
        {labelNames.map(label => (
          <TouchableOpacity
            key={label.key}
            onPress={() => onTabPress(label.key as PortfolioKeyType)}
            style={[
              styles.tabTrigger,
              activeTab === label.key
                ? styles.tabTriggerActive
                : styles.tabTriggerDefault,
              {paddingHorizontal: scaleSize(label.padding)},
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === label.key
                  ? styles.tabTextActive
                  : styles.tabTextDefault,
              ]}>
              {label.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default memo(ListHeader);
