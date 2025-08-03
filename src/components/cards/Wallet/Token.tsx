import {memo, useMemo} from 'react';
import styles from './styles';
import Card from '../Base';
import {Text, View} from 'react-native';
import {MainTabParamList, PnLResponse, WalletTokenDetail} from '../../../types';
import {Img, StatusBadge} from '../../common';
import {formatNumber, formatUsdNumber} from '../../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SCREEN_NAMES} from '../../../constants/navigation';
import {useTranslation} from 'react-i18next';

type Props = WalletTokenDetail & {
  pnl?: PnLResponse;
  navigation: NativeStackNavigationProp<MainTabParamList, 'Wallet', undefined>;
};

const WalletTokensCard = (props: Props) => {
  const {t} = useTranslation('common');
  const {token, events, pools, value, balance, pnl, navigation} = props;
  const pool = useMemo(() => pools?.[0], [pools]);

  if (!pool || !token) {
    return;
  }

  let cardProps: {onCardPress?: () => void} = {};

  if (token.symbol !== 'SOL') {
    cardProps.onCardPress = () =>
      token.symbol !== 'SOL' &&
      navigation.getParent()?.navigate(SCREEN_NAMES.APP.TOKEN_DETAIL, {
        mint: token.mint,
        pool: pool.poolId,
      });
  }

  const currentPnl = useMemo(() => {
    const percentageChange = events?.['24h']?.priceChangePercentage || 0;
    return (value * percentageChange) / 100;
  }, [value, events]);

  const pnlPercentage = useMemo(
    () => events?.['24h']?.priceChangePercentage || 0,
    [events],
  );

  return (
    <Card
      fligrant={false}
      {...cardProps}
      headers={[
        {
          left: (
            <View style={styles.titleContainer}>
              <Img
                source={token.image}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleName}>{token.symbol}</Text>
                <Text
                  style={
                    styles.titleMC
                  }>{`MC: $${formatNumber(pool.marketCap.usd, 2)}`}</Text>
              </View>
            </View>
          ),
        },
      ]}
      content={{
        header: {
          left: (
            <View style={styles.contentWrapper}>
              <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>{t('common:balance')}</Text>
                <Text style={styles.contentText}>
                  {`$${formatNumber(value, 2)}`}
                </Text>
                <Text style={styles.contentDescription}>
                  {formatNumber(balance, 2)}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[styles.contentTitle, styles.contentTextRight]}>
                  {t('common:currentPnl')}
                </Text>
                <Text style={[styles.contentText, styles.contentTextRight]}>
                  {`${formatUsdNumber(currentPnl, 2)}`}
                </Text>
                <View style={{marginLeft: 'auto'}}>
                  <StatusBadge
                    type={pnlPercentage > 0 ? 'success' : 'danger'}
                    label={`${formatNumber(pnlPercentage, 2)} %`}
                    containerStyle={styles.badgeContainer}
                  />
                </View>
              </View>
            </View>
          ),
        },
      }}
    />
  );
};

export default memo(WalletTokensCard);
