import {memo, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {TokenResponse, TokenEvents, PoolInfo, Trade} from '../../../types';
import Card from '../Base';
import {Text, TouchableOpacity, View} from 'react-native';
import {CreationBadge, Img, SolanaAbsoluteImage} from '../../common';
import {DocumentsIcon} from '../../../assets/icons';
import {copyToClipboard, formatNumber, truncateString} from '../../../utils';
import {COLORS} from '../../../constants/colors';
import TokenImage from './Image';
import MarketImage from './MarketImage';
import {useWebSocket} from '../../../hooks';

type Props = {
  time: keyof TokenEvents;
  token: TokenResponse;
  onPress: () => void;
};

const TokenCard = ({time, token, onPress}: Props) => {
  const {sendMessage, onPool, offPool, onTransaction, offTransaction} =
    useWebSocket();
  const [data, setData] = useState<TokenResponse>(token);

  const percentage =
    data.events && data.events[time] && data.events[time].priceChangePercentage
      ? data.events[time].priceChangePercentage
      : 0;

  useEffect(() => {
    sendMessage('subscribeToPool', [{wallet: data.mint, poolId: data.poolId}]);
    const updateTokenInData = (pollData: PoolInfo) => {
      setData(prevToken => {
        const updatedToken =
          prevToken.poolId === pollData.poolId
            ? {
                ...prevToken,
                liquidityUsd: pollData.liquidity.usd,
                marketCapUsd: pollData.marketCap.usd,
                priceUsd: pollData.price.usd,
              }
            : token;

        return updatedToken;
      });
    };

    const updateTransactionInData = (tradeData: Trade) => {
      setData(prevToken => {
        const updatedTokens =
          prevToken.mint === tradeData.wallet
            ? {
                ...prevToken,
                volume: tradeData.volume,
              }
            : prevToken;

        return updatedTokens;
      });
    };

    onPool(data.poolId, updateTokenInData);
    onTransaction(data.mint, updateTransactionInData);

    return () => {
      console.log('*** TokenScreen unmounted, cleaning up listeners ***');
      offPool(data.poolId, updateTokenInData);
      offTransaction(data.mint, updateTransactionInData);
    };
  }, []);

  return (
    <Card
      onHeaderLeftPress={onPress}
      onContentPress={onPress}
      headers={[
        {
          left: (
            <View style={[styles.cardLeftHeader]}>
              <View style={[styles.logo, styles.size]}>
                <TokenImage image={token.image} uri={token.uri} />
                <SolanaAbsoluteImage />
              </View>
              <Text style={styles.cardTitleText}>{token.symbol}</Text>
              <CreationBadge createdAt={token.createdAt} />
              <MarketImage market={token.market} />
            </View>
          ),
          right: (
            <View style={styles.navigateContainer}>
              <Text style={styles.copyText}>
                {truncateString(token.mint, 4, 3)}
              </Text>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => copyToClipboard(token.mint)}>
                <DocumentsIcon color={COLORS.WHITE} />
              </TouchableOpacity>
            </View>
          ),
        },
      ]}
      content={{
        items: [
          [
            {
              title: 'P:',
              description: `$${data.priceUsd.toFixed(6)}`,
              bracket: '',
              titleSolid: true,
              descriptionWhite: true,
            },
            {
              title: 'L:',
              description: formatNumber(data.liquidityUsd),
              // description: token.liquidityUsd.toString(),
              bracket: '',
              titleSolid: true,
              descriptionWhite: true,
            },
          ],
          [
            {
              title: 'V:',
              description: formatNumber(data.volume),
              bracket: '',
              titleSolid: true,
              descriptionWhite: true,
            },
          ],
        ],
      }}>
      <View style={styles.cardRightHeader}>
        <Text style={styles.titleBigText}>
          {formatNumber(data.marketCapUsd, 2)}
          {/* {token.marketCapUsd} */}
        </Text>
        {percentage !== undefined && (
          <Text
            style={[
              styles.percentageText,
              percentage <= 0
                ? styles.percentageDanger
                : styles.percentageSuccess,
            ]}>
            {`${percentage.toFixed(1)}%`}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default memo(TokenCard, (prevProps, nextProps) => {
  return (
    prevProps.token.mint === nextProps.token.mint &&
    prevProps.token.image === nextProps.token.image && // Image URL karşılaştırması ekleyin
    prevProps.token.priceUsd === nextProps.token.priceUsd &&
    prevProps.token.liquidityUsd === nextProps.token.liquidityUsd &&
    prevProps.token.marketCapUsd === nextProps.token.marketCapUsd &&
    prevProps.token.symbol === nextProps.token.symbol && // Symbol ekleyin
    prevProps.token.market === nextProps.token.market && // Market ekleyin
    prevProps.time === nextProps.time
  );
});
