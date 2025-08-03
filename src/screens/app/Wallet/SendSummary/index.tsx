import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {ScrollView, Text, View, Image} from 'react-native';
import {Header, LayoutStatusBar, SendingToCard} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {AppStackScreenProps, WalletModalDataType} from '../../../../types';
import {useSize} from '../../../../hooks';
import {RouteMergeIcon, SolanaBridgeIcon} from '../../../../assets/icons';
import {scaleSize} from '../../../../constants/dimensions';
import {ellipsizeString, getPrices} from '../../../../utils';
import {SOL_MINT} from '@env';
import SlideButton from './SlideButton';

type ItemProps = {
  title: string;
  text: string;
  status?: 'default' | 'success' | 'danger';
};

export const Item = ({title, text, status = 'default'}: ItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text
        style={[
          styles.itemText,
          status === 'default'
            ? styles.itemTextDefault
            : status === 'success'
              ? styles.itemTextSuccess
              : styles.itemTextDanger,
        ]}>
        {text}
      </Text>
    </View>
  );
};

const SendSummary = ({
  route,
  navigation,
}: AppStackScreenProps<'SendSummary'>) => {
  const {t} = useTranslation(['common', 'content', 'errors']);
  const {
    height,
    width,
    safeArea: {top},
  } = useSize();

  const scrollViewRef = useRef<ScrollView>(null);

  const [contentHeight, setContentHeight] = useState(height);

  const [solPrice, setSolPrice] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  const [feeEstimate, setFeeEstimate] = useState(route.params.feeEstimate || 0);
  const [feeEstimateUsd, setFeeEstimateUsd] = useState(0);

  const isBouncing = useMemo(() => {
    if (contentHeight <= height) {
      return false; // İçerik yüksekliği ekran yüksekliğinden küçükse bouncing yok
    }
    return true; // İçerik yüksekliği ekran yüksekliğinden büyükse bouncing var
  }, [contentHeight, height]);

  const updateScrollViewProps = useCallback((props: object) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps(props);
    }
  }, []);

  const walletModalDataType: WalletModalDataType = useMemo(
    () => ({
      mintImage: route.params.image,
      mint: route.params.mint,
      to: route.params.to,
      symbol: route.params.symbol,
      networkFee: feeEstimateUsd,
      amount: route.params.amount,
      amountUsd:
        route.params.amount *
        (route.params.symbol !== 'SOL' ? mintPrice : solPrice),
      tx: '',
    }),
    [route.params, feeEstimateUsd, mintPrice, solPrice],
  );

  const handleNavigateBack = useCallback(() => {
    setTimeout(() => {
      navigation.popToTop();
    }, 0);
  }, [navigation]);

  const navigationGesture = useCallback(
    (gestureEnabled: boolean) => {
      navigation.setOptions({
        gestureEnabled,
      });
    },
    [navigation],
  );

  useEffect(() => {
    const getPrice = async () => {
      const mints = [];
      if (route.params.mint !== 'SOL') {
        mints.push(route.params.mint);
      }
      const response = await getPrices(mints);
      if (response) {
        setSolPrice(response[SOL_MINT].usdPrice || 0);
        setMintPrice(response[route.params.mint]?.usdPrice || 0);
        setFeeEstimateUsd(
          route.params.feeEstimate * response[SOL_MINT].usdPrice || 0,
        );
      }
    };
    getPrice();
  }, [route.params.mint, route.params.feeEstimate]);

  return (
    <>
      <LayoutStatusBar />
      <ScrollView
        ref={scrollViewRef}
        style={[styles.scrollContainer, {marginTop: top}]}
        bounces={isBouncing}>
        <View
          style={[
            styles.container,
            {
              minHeight: height - top,
            },
          ]}
          onLayout={e => {
            const {height: scrollHeight} = e.nativeEvent.layout;
            setContentHeight(scrollHeight + top);
          }}>
          <View style={styles.topContainer}>
            <Header title={t('common:send')} onPressBack={navigation.goBack} />
            <View style={styles.mainCard}>
              <View
                style={[
                  styles.imageContainer,
                  styles.imageSize,
                  styles.solanaImage,
                ]}>
                {route.params.mint === SOL_MINT ? (
                  <SolanaBridgeIcon
                    width={scaleSize(26.14)}
                    height={scaleSize(23.42)}
                  />
                ) : (
                  <Image
                    source={{uri: route.params.image}}
                    style={[styles.imageSize]}
                    resizeMode="cover"
                  />
                )}
              </View>
              <SendingToCard to={route.params.to} />
              <View style={styles.amountContainer}>
                <View style={styles.mintAmountContainer}>
                  <Text style={styles.mintAmountText}>
                    {route.params.amount} {route.params.symbol}
                  </Text>
                  <RouteMergeIcon
                    color={'#676A6F'}
                    width={scaleSize(8.77)}
                    height={scaleSize(10.77)}
                    style={styles.routeRotate}
                  />
                </View>
                <Text
                  style={
                    styles.mintAmountUsdText
                  }>{`$${(route.params.amount * (route.params.symbol !== 'SOL' ? mintPrice : solPrice)).toFixed(route.params.symbol !== 'SOL' ? route.params.decimal : 2)}`}</Text>
              </View>
              <View style={styles.detailCard}>
                <Item
                  title={t('common:to')}
                  text={ellipsizeString(route.params.to, 10, 10)}
                />
                <Item
                  title={t('content:exchangeRate')}
                  text={`1 ${route.params.symbol} = ${route.params.symbol !== 'SOL' ? mintPrice.toFixed(route.params.decimal) : solPrice.toFixed(2)} $`}
                />
                <Item
                  title={t('content:networkFee')}
                  text={`$${feeEstimateUsd < 0.01 ? '<0.01' : feeEstimateUsd.toFixed(2)}`}
                />
              </View>
            </View>
          </View>
          <SlideButton
            isBouncing={isBouncing}
            mint={route.params.mint}
            amount={route.params.amount}
            to={route.params.to}
            decimal={route.params.decimal}
            updateScrollViewProps={updateScrollViewProps}
            modalData={walletModalDataType}
            handleNavigateBack={handleNavigateBack}
            navigationGesture={navigationGesture}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default memo(SendSummary);
