import {memo, useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {ActivityIndicator, Text, View} from 'react-native';
import {PageHeaderCard, TokenCard} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../../../constants/colors';
import {AppStackScreenProps, PoolInfo, TokenResponse} from '../../../../types';
import {getSearchToken} from '../../../../utils';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {tokenSearchHistoryService} from '../../../../services';
import {useWebSocket} from '../../../../hooks';

type Props = AppStackScreenProps<'TokenSearch'> & {
  isSubmitting: boolean;
};

const EmptySearch = ({isSubmitting, navigation}: Props) => {
  const {t} = useTranslation(['common', 'content']);
  const {onPool, offPool, sendMessage} = useWebSocket();

  const [historyData, setHistoryData] = useState<TokenResponse[]>([]);

  const getHistoryData = useCallback(async () => {
    const data = await getSearchToken();

    if (data.length > 0) {
      setHistoryData(data);

      const postData = data.map(item => ({
        mint: item.mint,
        pool: item.poolId,
      }));

      const response = await tokenSearchHistoryService(postData);
      if (response.status === 'success') {
        const pools = data.map(token => ({
          wallet: token.mint,
          poolId: token.poolId,
        }));
        const newData = data.map(item => {
          const find = response.data.find(
            d => item.poolId === d.poolId && item.mint === d.mint,
          );

          if (find) return find;
          return item;
        });
        setHistoryData(newData);
        sendMessage('subscribeToPool', pools);
      }
    }
  }, [getSearchToken, sendMessage]);

  useEffect(() => {
    getHistoryData();
  }, [getHistoryData]);

  useEffect(() => {
    const currentPools = historyData.map(token => token.poolId);

    const updateData = (poolData: PoolInfo) => {
      setHistoryData(prevData =>
        prevData.map(item =>
          item.poolId === poolData.poolId
            ? {
                ...item,
                liquidityUsd: poolData.liquidity.usd,
                marketCapUsd: poolData.marketCap.usd,
                priceUsd: poolData.price.usd,
              }
            : item,
        ),
      );
    };

    currentPools.forEach(poolId => {
      onPool(poolId, updateData);
    });

    return () => {
      currentPools.forEach(poolId => {
        offPool(poolId, updateData);
      });
    };
  }, [historyData]);

  if (isSubmitting) {
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.PRIMARY}
        style={styles.loadingIndicator}
      />
    );
  }

  return (
    <View style={[styles.scrollContentContainer]}>
      <PageHeaderCard
        title={t('content:historySearch')}
        fontSize={25}
        lineHeight={33}
        letterSpacing={-0.5}
      />
      {historyData.length > 0 ? (
        historyData.map(item => (
          <TokenCard
            key={`${item.mint}-${item.poolId}`}
            token={item}
            time={'24h'}
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.APP.TOKEN_DETAIL, {
                mint: item.mint,
                pool: item.poolId,
              });
            }}
          />
        ))
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{t('common:noDataAvailable')}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(EmptySearch);
