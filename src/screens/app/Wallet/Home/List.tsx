import {memo, useCallback, useMemo, useState} from 'react';
import styles from './styles';
import HeaderComponent from './HeaderComponent';
import {FlatList, Text, View} from 'react-native';
import {useSession, useSize, useWallet} from '../../../../hooks';
import {
  MainTabScreenProps,
  PnLData,
  WalletTabDataType,
  WalletTabType,
  WalletTokenDetail,
} from '../../../../types';
import {
  PageLoading,
  RefreshIndicator,
  WalletTokenCard,
} from '../../../../components';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {showAlert} from '../../../../utils/alert';
import {useTranslation} from 'react-i18next';

const List = ({navigation}: MainTabScreenProps<'Wallet'>) => {
  const {t} = useTranslation(['errors']);
  const {
    safeArea: {top},
  } = useSize();
  const {user} = useSession();
  const {
    selectedTabIndex,
    tabData,
    pnlData,
    balance,
    tokens,
    totalChange,
    sendTokenData,
    handleRefresh,
    refreshing,
  } = useWallet();

  const handleExportWallet = useCallback(() => {
    navigation.getParent()?.navigate(SCREEN_NAMES.APP.EXPORT_WALLET);
  }, [navigation]);

  const handleGetDomain = useCallback(() => {
    navigation.getParent()?.navigate(SCREEN_NAMES.APP.DOMAIN);
  }, [navigation]);

  const handleSendToken = useCallback(() => {
    if (sendTokenData.length === 0) {
      showAlert('error', t('errors:haveNotToken'));
    } else {
      navigation.getParent()?.navigate(SCREEN_NAMES.APP.SELECT_SEND_TOKEN, {
        data: sendTokenData,
      });
    }
  }, [sendTokenData, navigation, t]);

  const handleRenderItemAll = useCallback(
    ({item}: {item: WalletTabDataType}) => {
      if (selectedTabIndex === 0) {
        const dataItem = item as WalletTokenDetail;
        return (
          <View style={[styles.paddingContainer]}>
            <WalletTokenCard
              {...dataItem}
              navigation={navigation}
              pnl={pnlData}
            />
          </View>
        );
      } else {
        const data = item as WalletTabType;
        return (
          <Text style={{color: 'white'}}>
            {data.name} {data.surname}
          </Text>
        );
      }
    },
    [selectedTabIndex, pnlData, navigation, t],
  );

  const listData = useMemo(() => {
    const data: WalletTokenDetail[] = [];

    if (tokens && tokens.tokens.length > 0) {
      data.push(...tokens.tokens);
    }

    return data;
  }, [tokens]);

  const handleRenderItem = useCallback(
    ({item}: {item: WalletTokenDetail}) => {
      return (
        <View style={[styles.paddingContainer]}>
          <WalletTokenCard {...item} navigation={navigation} pnl={pnlData} />
        </View>
      );
    },
    [pnlData, navigation],
  );

  if (!user || !balance || !totalChange || !pnlData) {
    return <PageLoading />;
  }

  return (
    <View>
      <Text style={{color: 'white'}}>{pnlData.summary.total}</Text>
    </View>
  );
};

export default memo(List);
