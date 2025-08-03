import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import type {
  PnLData,
  AppStackScreenProps,
  PoolInfo,
  TokenDetailResponse,
  PoolTraderTokenType,
  TradeType,
} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {LayoutStatusBar, PageLoading} from '../../../../components';
import {useSession, useSize, useWebSocket} from '../../../../hooks';
import {tokenDetailService} from '../../../../services';
import {showAlert} from '../../../../utils/alert';
import ListHeader from './ListHeader';
import {BlurView} from '@react-native-community/blur';
import {SPACING} from '../../../../constants/dimensions';
import TokenProvider from './context';
import {useFocusEffect} from '@react-navigation/native';
import WalletModal from './WalletModal';

const TokenDetailScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'TokenDetail'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {
    safeArea: {top, bottom},
  } = useSize();
  const {user} = useSession();
  const {sendMessage, onPool, offPool} = useWebSocket();

  const {mint, pool} = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [tokenInfo, setTokenInfo] = useState<TokenDetailResponse>();
  const [pnlData, setPnlData] = useState<PnLData>();
  const [solPrice, setSolPrice] = useState<number>(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [poolData, setPoolData] = useState<PoolTraderTokenType[]>([]);
  const [showWalletsModal, setShowWalletsModal] = useState(false);
  const [showUserWallet, setShowUserWallet] = useState(false);
  const [tradeType, setTradeType] = useState<TradeType>();

  const haveToken = useMemo(() => {
    if (pnlData) {
      return true;
    } else {
      const find = poolData.find(
        p => p.assetMint === mint && p.quantity && p.quantity > 0,
      );
      return !!find;
    }
  }, [pnlData, poolData]);

  const poolWallets = useMemo(
    () => poolData.map(p => ({type: p.type, wallet: p.walletAddress})),
    [poolData],
  );

  useEffect(() => {
    const getData = async () => {
      const response = await tokenDetailService(mint, pool);

      if (response.status === 'success') {
        const token = response.data.tokenInfo;
        setTokenInfo(token);
        setSolPrice(response.data.solPrice);
        setPoolData(response.data.poolData);
        const pools = [
          {wallet: token.token.mint, poolId: token.pools[0].poolId},
        ];
        sendMessage('subscribeToPool', pools);
        if (response.data.pnl) {
          setPnlData(response.data.pnl);
        }
        setIsLoading(false);
      } else {
        showAlert(response.status, response.message, [
          {
            text: t('common:close'),
            style: 'cancel',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    };

    if (route.params) {
      getData();
    }
  }, [route.params]);

  const handleLayout = useCallback(() => {
    if (isSubscribed || !tokenInfo) return;

    const poolId = tokenInfo.pools[0].poolId;
    const updatePoolData = (data: PoolInfo) => {
      if (tokenInfo.pools[0].poolId === data.poolId) {
        const oldPools = tokenInfo.pools;
        oldPools.shift();

        setTokenInfo(prev =>
          prev
            ? {
                ...prev,
                pools: [{...data}, ...oldPools],
              }
            : prev,
        );
        setIsSubscribed(true);
      }
    };

    onPool(poolId, updatePoolData);

    return () => {
      console.log('Unsubscribing from pool:', poolId);
      offPool(poolId, updatePoolData);
    };
  }, [tokenInfo, onPool, offPool]);

  useFocusEffect(handleLayout);

  const handleNavigation = useCallback(
    (type: TradeType, wallet: string) => {
      if (!tokenInfo) return;
      let tokenCount: number | undefined = undefined;

      if (wallet !== user?.wallet) {
        const filtered = poolData.filter(
          p => p.assetMint === mint && p.walletAddress === wallet,
        );

        tokenCount = filtered.length > 0 ? filtered[0].quantity : undefined;
      } else {
        tokenCount = pnlData ? pnlData.holding : undefined;
      }

      navigation.navigate('TokenTrade', {
        mint: tokenInfo.token.mint,
        price: tokenInfo.pools[0].price.usd,
        symbol: tokenInfo.token.symbol,
        type,
        image: tokenInfo.token.image,
        decimal: tokenInfo.token.decimals,
        wallet,
        tokenCount,
        solPrice,
      });
    },
    [navigation, tokenInfo, pnlData],
  );

  const handlePress = useCallback(
    (type: TradeType) => {
      if (!tokenInfo || !user) return;
      setTradeType(type);

      const pools = poolData.filter(
        p => p.assetMint === mint && p.quantity && p.quantity > 0,
      );

      if (type === 'buy') {
        if (poolWallets.length > 0) {
          setShowUserWallet(true);
          setShowWalletsModal(true);
        } else {
          handleNavigation(type, user.wallet);
        }
      } else {
        if (pools.length > 0) {
          if (!pnlData) {
            setShowUserWallet(false);
          }
          if (pools.length > 1) {
            setShowWalletsModal(true);
          } else {
            handleNavigation(type, pools[0].walletAddress);
          }
        } else {
          if (pnlData) {
            handleNavigation(type, user.wallet);
          }
        }
      }
    },
    [handleNavigation, tokenInfo, user, pnlData],
  );

  const handleSelectWallets = useCallback(
    (wallet: string) => {
      if (tradeType) {
        handleNavigation(tradeType, wallet);
        setTradeType(undefined);
      }
      setTimeout(() => {
        setShowWalletsModal(false);
        setShowUserWallet(false);
      }, 300);
    },
    [tradeType, handleNavigation],
  );

  if (isLoading || !tokenInfo) {
    return <PageLoading />;
  }

  return (
    <TokenProvider mint={mint} pool={pool}>
      <WalletModal
        visible={showWalletsModal}
        onClose={() => {
          setShowWalletsModal(false);
          setShowUserWallet(false);
        }}
        wallets={poolWallets}
        onSelect={handleSelectWallets}
        showUserWallet={showUserWallet}
      />
      <LayoutStatusBar />
      <View style={[styles.container, {paddingTop: top}]}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
          <ListHeader
            pnlData={pnlData}
            tokenData={tokenInfo}
            navigation={navigation}
            solPrice={solPrice}
          />
        </ScrollView>
        <View
          style={[
            styles.buttonsContainer,
            {
              paddingBottom: bottom > 0 ? SPACING.PAGE_BOTTOM : SPACING.MD_LG,
            },
          ]}>
          <BlurView
            style={[styles.absolute, styles.blurContainer]}
            blurType="dark"
            blurAmount={30}
            reducedTransparencyFallbackColor="black"
          />
          <TouchableOpacity
            style={[styles.button, styles.buyButton]}
            onPress={() => handlePress('buy')}>
            <Text style={[styles.buttonText, styles.buyButtonText]}>
              {t('common:buy')}
            </Text>
          </TouchableOpacity>
          {haveToken && (
            <TouchableOpacity
              style={[styles.button, styles.sellButton]}
              onPress={() => handlePress('sell')}>
              <Text style={[styles.buttonText, styles.sellButtonText]}>
                {t('common:sell')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TokenProvider>
  );
};

export default memo(TokenDetailScreen);
