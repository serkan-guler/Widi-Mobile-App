import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {WebView} from 'react-native-webview';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {
  AppStackParamList,
  ChartResponse,
  ChartTimeType,
  PoolInfo,
} from '../../../../types';
import {COLORS, COMPONENT_COLORS} from '../../../../constants/colors';
import {chartTimeData} from '../../../../lib/data';
import {useTranslation} from 'react-i18next';
import {useTokenContext} from './context';
import {BlurView} from '@react-native-community/blur';
import {showAlert} from '../../../../utils/alert';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {tokenChartDataService} from '../../../../services';
// import {useWebSocket} from '../../../../hooks';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'TokenDetail',
    undefined
  >;
};

type ChartDataType = {[key in ChartTimeType]: ChartResponse[]};

const emptyChartData: ChartDataType = {
  '1m': [],
  '15m': [],
  '1h': [],
  '4h': [],
  '24h': [],
};

const TradingViewLineChart = ({navigation}: Props) => {
  const {t} = useTranslation('common');
  const {
    selectedTime,
    onChangeTime,
    chartDataType,
    selectedTimeZone,
    mint,
    pool,
  } = useTokenContext();
  const fontUri = require('../../../../assets/fonts/Telegraf-Medium.otf');

  const [data, setData] = useState<ChartDataType>(emptyChartData);
  const [isLoading, setIsLoading] = useState(true);

  const chartData = useMemo(() => {
    return data[selectedTime].map(item => ({
      time: item.time,
      value: item.close,
    }));
  }, [data, selectedTime]);

  const fetchData = useCallback(async () => {
    const response = await tokenChartDataService(
      mint,
      pool,
      selectedTime,
      chartDataType,
    );

    if (response.status === 'success') {
      setData(prev => ({
        ...prev,
        [selectedTime]: response.data,
      }));
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
  }, [mint, pool, selectedTime, navigation, t, chartDataType]);

  useEffect(() => {
    if (chartData.length === 0) {
      setIsLoading(true);
      fetchData();
    }
  }, [selectedTime, chartData, chartDataType]);

  useEffect(() => {
    setData(emptyChartData);
  }, [chartDataType]);

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <style>
        @font-face {
          font-family: 'Telegraph';
          src: url('${fontUri}') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        html, body {
          background-color: #1C1C1C !important;
        }
        body {
          background-color: #1C1C1C !important;
        }
         .tooltip {
          position: absolute;
          background: rgba(28, 28, 28, 0.95);
          border: 1px solid #E4070A;
          border-radius: 8px;
          padding: 8px 12px;
          color: white;
          font-family: 'Telegraph', sans-serif;
          font-size: 12px;
          pointer-events: none;
          z-index: 1000;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(228, 7, 10, 0.3);
        }
        
        .tooltip-time {
          color: #676A6F;
          margin-bottom: 4px;
        }
        
        .tooltip-price {
          color: #E4070A;
          font-weight: bold;
        } 
      </style>
    </head>
    <body style="margin:0">
      <div id="tooltip" class="tooltip" style="display: none;"></div>
      <script src="https://unpkg.com/lightweight-charts@3.4.0/dist/lightweight-charts.standalone.production.js"></script>
      <script>
        const chart = LightweightCharts.createChart(document.body, {
            width: window.innerWidth,
            height: window.innerHeight,
            layout: {
                backgroundColor: '#1C1C1C',
                textColor: '#676A6F',
                fontFamily: 'Telegraph, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 11,
                lineHeight: 12,
            },
            grid: {
                vertLines: 'transparent',
                horzLines: { color: '#676A6F' },
            },
            rightPriceScale: {
                visible: true,
                borderColor: '#676A6F',
                textColor: '#FFFFFF',
                autoScale: true,
                mode: LightweightCharts.PriceScaleMode.Normal,
                alignLabels: true,
                borderVisible: true,
                scaleMargins: {
                    top: 0.2,
                    bottom: 0.2,
                },
                entireTextOnly: false,
                minimumWidth: 80,
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
                rightBarStaysOnScroll: true,
                fixLeftEdge: false,
                fixRightEdge: false,
            },
            localization: {
                priceFormatter: (price) => {
                  const dataType = '${chartDataType}';
                  if (dataType === 'marketCap') {
                    const units = [
                        {value: 1e9, suffix: 'B'},
                        {value: 1e6, suffix: 'M'},
                        {value: 1e3, suffix: 'K'},
                    ];
                    for (const unit of units) {
                      if (price >= unit.value) {
                          const formatted = (price / unit.value).toFixed(2);
                          return '$' + formatted + unit.suffix;
                      }
                    }
                    return '$' + price.toFixed(2);
                  } else {
                    if (price >= 1) {
                      return '$' + price.toFixed(4);
                    } else if (price >= 0.0001) {
                      const decimals = Math.min(8, Math.max(4, -Math.floor(Math.log10(price)) + 2));
                      return '$' + price.toFixed(decimals);
                    } else if (price > 0) {
                      // Subscript formatı için
                      let str = price.toFixed(20).replace(/\\.?0+$/, '');
                      let match = str.match(/0\\.0*(\\d)/);
                      if (match) {
                        let zeroCount = str.indexOf(match[1]) - 2;
                        let remainingDigits = str.substring(str.indexOf(match[1]));
                        let displayDigits = remainingDigits.substring(0, 5);
                        return '$0.0₀' + zeroCount + displayDigits;
                      }
                      return '$' + price.toExponential(3);
                    } else {
                      return '$0';
                    }
                  }
                },
            },
        });

        const lineSeries = chart.addLineSeries({
            color: '#E4070A',
            lineWidth: 2,
            priceLineVisible: true,
            lastValueVisible: true,
            crosshairMarkerVisible: true,
            crosshairMarkerRadius: 4,
            priceFormat: {
                type: 'custom',
                formatter: (price) => {
                  const dataType = '${chartDataType}';
                  if (dataType === 'marketCap') {
                    // Market Cap için büyük sayı formatı
                    const units = [
                        {value: 1e9, suffix: 'B'},
                        {value: 1e6, suffix: 'M'},
                        {value: 1e3, suffix: 'K'},
                    ];
                    for (const unit of units) {
                      if (price >= unit.value) {
                          const formatted = (price / unit.value).toFixed(2);
                          return '$' + formatted + unit.suffix;
                      }
                    }
                    return '$' + price.toFixed(2);
                  } else {
                    // Price için subscript formatı
                    if (price >= 1) {
                      return '$' + price.toFixed(4);
                    } else if (price >= 0.0001) {
                      const decimals = Math.min(8, Math.max(4, -Math.floor(Math.log10(price)) + 2));
                      return '$' + price.toFixed(decimals);
                    } else if (price > 0) {
                      // Subscript formatı - resimdeki gibi
                      let str = price.toFixed(20).replace(/\\.?0+$/, '');
                      let match = str.match(/0\\.0*(\\d)/);
                      if (match) {
                        let zeroCount = str.indexOf(match[1]) - 2;
                        let remainingDigits = str.substring(str.indexOf(match[1]));
                        let displayDigits = remainingDigits.substring(0, 5);
                        return '$0.0₀' + zeroCount + displayDigits;
                      }
                      return '$' + price.toExponential(3);
                    } else {
                      return '$0';
                    }
                  }
                },
                minMove: 1e-20,
                precision: 20, // Yeterli hassasiyet için
            },
        });

        const chartData = ${JSON.stringify(chartData)};

        // Shadow için areaSeries
        var areaSeries = chart.addAreaSeries({
            topColor: 'rgba(208, 17, 27, 0.55)',
            bottomColor: 'rgba(255, 0, 0, 0)',
            lineColor: '${COMPONENT_COLORS.PRIMARY_BUTTON.DISABLED}',
            lineWidth: 0,
            priceLineVisible: false, // Area series price line'ını gizle
            lastValueVisible: false, // Area series son değer label'ını gizle
        });
        areaSeries.setData(chartData);

        lineSeries.setData(chartData);

        var lastIndex = chartData.length - 1;
        var fromIndex = Math.max(0, lastIndex - 5);
        chart.timeScale().setVisibleLogicalRange({ from: fromIndex, to: lastIndex });

        chart.timeScale().applyOptions({
          tickMarkFormatter: function(time) {
            var date = new Date(time * 1000);

            var timezoneMap = {
              '+0': 'UTC',
              '+1': 'Europe/Berlin',
              '+2': 'Europe/Helsinki', 
              '+3': 'Europe/Istanbul',
              '+4': 'Asia/Dubai',
              '+5': 'Asia/Karachi',
              '+6': 'Asia/Dhaka',
              '+7': 'Asia/Bangkok',
              '+8': 'Asia/Shanghai',
              '+9': 'Asia/Tokyo',
              '+10': 'Australia/Sydney',
              '+11': 'Pacific/Auckland',
              '+12': 'Pacific/Fiji',
              '-1': 'Atlantic/Azores',
              '-2': 'Atlantic/South_Georgia',
              '-3': 'America/Sao_Paulo',
              '-4': 'America/New_York',
              '-5': 'America/Chicago',
              '-6': 'America/Denver',
              '-7': 'America/Los_Angeles',
              '-8': 'America/Anchorage',
              '-9': 'Pacific/Honolulu',
              '-10': 'Pacific/Tahiti',
              '-11': 'Pacific/Midway',
              '-12': 'Pacific/Baker_Island'
            };
            
            var timezone = timezoneMap['${selectedTimeZone}'] || 'UTC';

            return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: timezone });
          }
        });
        
      </script>
    </body>
  </html>
  `;
  return (
    <View style={styles.chartContainer}>
      {isLoading && (
        <>
          <BlurView
            style={[styles.absolute, styles.chartBlur]}
            blurType="dark"
            blurAmount={2}
            reducedTransparencyFallbackColor="black"
          />
          <View style={[styles.absolute, styles.chartContainerLoading]}>
            <ActivityIndicator color={COLORS.PRIMARY} />
          </View>
        </>
      )}
      <View style={styles.chartHeader}>
        {chartTimeData.map((item, index) => {
          const timeRangeKey = `${item.key}${item.value}` as ChartTimeType;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeButton,
                timeRangeKey === selectedTime
                  ? styles.timeButtonActiveColor
                  : styles.timeButtonColor,
              ]}
              onPress={() => {
                onChangeTime(timeRangeKey);
                // setChartDataIsLoading(true);
              }}>
              <Text
                style={[
                  styles.timeText,
                  timeRangeKey === selectedTime
                    ? styles.timeTextActiveColor
                    : styles.timeTextColor,
                ]}>
                {t(`common:${item.value}`, {value: item.key})}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.chartWrapper}>
        <View style={styles.flex1}>
          <WebView
            originWhitelist={['*']}
            source={{html}}
            style={styles.webView}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(TradingViewLineChart);
