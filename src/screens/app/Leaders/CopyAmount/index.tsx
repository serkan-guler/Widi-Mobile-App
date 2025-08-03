import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {
  Dimensions,
  LayoutChangeEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  AvailableCard,
  BaseButton,
  Card,
  CopyInfoCard,
  Header,
  LikeButton,
  PageHeaderCard,
  PortfolioUserCard,
} from '../../../../components';
import {AppStackScreenProps} from '../../../../types';
import {RouteMergeIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleSize} from '../../../../constants/dimensions';
import {copyPortfolioService, getWalletBalance} from '../../../../services';
import {formatJoinDate} from '../../../../utils';
import {showErrorAlert} from '../../../../utils/alert';
import {useWebSocket} from '../../../../hooks';
import WalletManager from '../../../../lib/WalletManager';

type HeightState = {
  header: number;
  user: number;
  cardContainer: number;
  title: number;
  amount: number;
  touchPad: number;
  footer: number;
};

const CopyAmountScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'CopyAmount'>) => {
  const {t} = useTranslation(['common', 'content']);
  const {top, bottom, left, right} = useSafeAreaInsets();
  const {sendMessage} = useWebSocket();
  const scrollViewRef = useRef<ScrollView>(null);

  const [like, setLike] = useState(route.params.isLiked);
  const [likeCount, setLikeCount] = useState(route.params.favoriteCount);
  const [amount, setAmount] = useState<string>('0');
  const [showPad, setShowPad] = useState(false);
  const [componentHeight, setComponentHeight] = useState<HeightState>({
    header: 0,
    user: 0,
    cardContainer: 0,
    title: 0,
    amount: 0,
    touchPad: 0,
    footer: 0,
  });
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await getWalletBalance();
      if (response.status === 'success') {
        setBalance(response.data);
      } else {
        showErrorAlert(response);
      }
    };

    fetchBalance();
  }, []);

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const baseHeight = screenHeight - top - bottom;
  const spacing = scaleSize(32 + 22 + 16 + 16 + 20 + 10.5 + 28 + 22);
  const height = showPad ? baseHeight * 1.34 : baseHeight;

  const handleLike = useCallback(() => {
    setLike(!like);
    setLikeCount(prev => (like ? prev - 1 : prev + 1));
    sendMessage('favorite', route.params.trader._id);
  }, [like, likeCount]);

  const calculatedHeight = useMemo(() => {
    const components = Object.values(componentHeight).reduce(
      (acc, value) => acc + value,
      0,
    );
    const totalComponents = showPad
      ? components
      : components - componentHeight.touchPad;
    const total = totalComponents + spacing;
    return Math.max(total, baseHeight);
  }, [componentHeight, baseHeight, spacing, showPad]);

  const handleAmountChange = useCallback((value: number | '.' | 'del') => {
    setAmount(prev => {
      if (value === 'del') {
        return prev.length > 1 ? prev.slice(0, -1) : '0';
      } else if (value === '.') {
        // Eğer zaten nokta varsa, yeni nokta ekleme
        if (prev.includes('.')) return prev;
        return prev + '.';
      } else {
        // Eğer ilk değer 0 ise ve nokta yoksa, direkt yeni değeri yaz
        if (prev === '0' && !prev.includes('.')) {
          return value.toString();
        }

        const newValue = prev + value.toString();
        // Sayısal değer kontrolü
        const numValue = parseFloat(newValue);
        if (numValue > 9999) return prev;

        // Ondalık basamak kontrolü (maksimum 5 basamak)
        const [, decimal] = newValue.split('.');
        if (decimal && decimal.length > 5) return prev;

        return newValue;
      }
    });
  }, []);

  const handleShowPad = useCallback(() => {
    setShowPad(prev => !prev);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({animated: true}), 100);
  }, []);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent, area: keyof HeightState) => {
      const {height} = event.nativeEvent.layout;
      setComponentHeight(prev => ({...prev, [area]: height}));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const price = parseFloat(amount);
    if (isNaN(price) || price <= 0) {
      return;
    }
    const tx = WalletManager.generateRandomTxHash();
    const response = await copyPortfolioService({
      poolId: route.params.id,
      amount: price,
      isTrader: false,
      tx,
    });
  }, [copyPortfolioService, route.params, amount]);

  return (
    <ScrollView
      ref={scrollViewRef}
      overScrollMode={calculatedHeight > baseHeight ? 'auto' : 'never'}
      bounces={calculatedHeight > baseHeight}
      style={[
        styles.scrollContainer,
        // {height, marginTop: top, marginBottom: bottom},
        {marginTop: top},
      ]}>
      <View style={[styles.contentContainer, {height: calculatedHeight}]}>
        <View style={styles.padding} onLayout={e => handleLayout(e, 'header')}>
          <Header
            title={t('common:copy')}
            onPressBack={() => navigation.goBack()}
          />
        </View>
        <View style={[styles.padding, styles.bodyContainer]}>
          <View onLayout={e => handleLayout(e, 'user')}>
            <PortfolioUserCard
              showBio
              cardUser={route.params.trader}
              leadingContent={
                <LikeButton
                  onPress={handleLike}
                  like={like}
                  likeCount={likeCount}
                />
              }
            />
          </View>
          <View
            style={styles.cardContainer}
            onLayout={e => handleLayout(e, 'cardContainer')}>
            <PageHeaderCard title={t('common:copy')} />
            <View style={styles.cardWrapper}>
              <CopyInfoCard
                joinDays={formatJoinDate(route.params.openingDate)}
                totalCopiers={route.params.totalCopiers}
                maxCopiers={route.params.maxParticipants}
              />
              <Card
                fligrant={false}
                content={{
                  items: [
                    [
                      {
                        title: t('common:days', {
                          value: route.params.lockPeriod,
                        }),
                        description: t('content:lockPeriod'),
                        bracket: '-',
                      },
                      {
                        title: `${route.params.profitShare}%`,
                        description: t('content:profitSharing'),
                        bracket: '-',
                      },
                    ],
                    [
                      {
                        title: route.params.minCopyAmount.toString(),
                        description: `${t('content:minCopyAmt')} (SOL)`,
                        bracket: '-',
                      },
                    ],
                  ],
                }}
              />
            </View>
          </View>
          <View style={styles.amountContainer}>
            <View onLayout={e => handleLayout(e, 'title')}>
              <PageHeaderCard
                title={t('content:howMuchCopySol')}
                fontSize={19}
                lineHeight={24}
                letterSpacing={-0.4}
              />
            </View>
            <View
              style={styles.amountWrapper}
              onLayout={e => handleLayout(e, 'amount')}>
              <Text style={styles.amountText} onPress={handleShowPad}>
                {amount} SOL
              </Text>
              <AvailableCard amount={balance} type="sol" />
            </View>
            {showPad && (
              <View
                style={styles.touchPadContainer}
                onLayout={e => handleLayout(e, 'touchPad')}>
                <View style={styles.touchPadRowContainer}>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(1)}>
                    <Text style={styles.touchPadText}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(2)}>
                    <Text style={styles.touchPadText}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(3)}>
                    <Text style={styles.touchPadText}>3</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.touchPadRowContainer}>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(4)}>
                    <Text style={styles.touchPadText}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(5)}>
                    <Text style={styles.touchPadText}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(6)}>
                    <Text style={styles.touchPadText}>6</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.touchPadRowContainer}>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(7)}>
                    <Text style={styles.touchPadText}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(8)}>
                    <Text style={styles.touchPadText}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(9)}>
                    <Text style={styles.touchPadText}>9</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.touchPadRowContainer}>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange('.')}>
                    <Text style={styles.touchPadText}>.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange(0)}>
                    <Text style={styles.touchPadText}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => handleAmountChange('del')}>
                    <Text style={styles.touchPadText}>
                      <RouteMergeIcon
                        width={scaleSize(22)}
                        height={scaleSize(22)}
                        color={COLORS.WHITE}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        <View
          style={styles.footerContainer}
          onLayout={e => handleLayout(e, 'footer')}>
          <BaseButton
            label={t('common:copy')}
            //   onPress={() => navigation.navigate(SCREEN_NAMES.APP.PRIVATE_CODE)}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(CopyAmountScreen);
