import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {MainTabScreenProps, WalletTokenDetail} from '../../../../types';
import {FlatList, Text, View} from 'react-native';
import {PageLoading, WalletTokenCard} from '../../../../components';
import {useSession, useSize, useWallet} from '../../../../hooks';
import HeaderComponent from './HeaderComponent';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {showAlert} from '../../../../utils/alert';
import {useTranslation} from 'react-i18next';
import Positions from './Positions';

const WalletScreen = (props: MainTabScreenProps<'Wallet'>) => {
  const {navigation} = props;
  const {t} = useTranslation(['errors', 'content']);
  const {tokens, pnlData, sendTokenData, selectedTabIndex} = useWallet();
  const {user} = useSession();
  const {
    safeArea: {top},
  } = useSize();
  const {widiDomains} = useWallet();

  const [haveWidiDomain, setHaveWidiDomain] = useState(false);

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

  const handleExportWallet = useCallback(() => {
    navigation.getParent()?.navigate(SCREEN_NAMES.APP.EXPORT_WALLET);
  }, [navigation]);

  const handleGetDomain = useCallback(() => {
    if (haveWidiDomain) {
      showAlert('info', t('content:youHaveWidiDomain'));
    } else {
      navigation.getParent()?.navigate(SCREEN_NAMES.APP.DOMAIN);
    }
  }, [haveWidiDomain, navigation]);

  const handleSendToken = useCallback(() => {
    if (sendTokenData.length === 0) {
      showAlert('error', t('errors:haveNotToken'));
    } else {
      navigation.getParent()?.navigate(SCREEN_NAMES.APP.SELECT_SEND_TOKEN, {
        data: sendTokenData,
      });
    }
  }, [sendTokenData, navigation, t]);

  useEffect(() => {
    if (widiDomains.length > 0) {
      widiDomains.map(domain => {
        if (domain.endsWith('.widi') || domain.endsWith('.widi.sol')) {
          setHaveWidiDomain(true);
        }
      });
    }
  }, [widiDomains]);

  if (!user || !pnlData) {
    return <PageLoading />;
  }

  if (selectedTabIndex === 0) {
    return (
      <FlatList
        style={[styles.container, {marginTop: top}]}
        contentContainerStyle={[styles.paddingBottom, styles.cardGap]}
        data={listData}
        renderItem={handleRenderItem}
        keyExtractor={item => item.token.mint}
        ListHeaderComponent={
          <HeaderComponent
            handleExportWallet={handleExportWallet}
            walletAddress={user.wallet}
            handleGetDomain={handleGetDomain}
            handleSendToken={handleSendToken}
          />
        }
      />
    );
  }

  return <Positions {...props} />;
};

export default memo(WalletScreen);
