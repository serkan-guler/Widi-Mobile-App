import React, {memo} from 'react';
import styles from './styles';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import {ChartResponse} from '../../../../types';
// import {formatNumber} from '../../../../utils';
import {COMPONENT_COLORS} from '../../../../constants/colors';

type Props = {
  data: ChartResponse[];
};

const TradingViewLineChart = ({data}: Props) => {
  const fontUri = require('../../../../assets/fonts/Telegraf-Medium.otf');

  const chartData = data.map(item => ({
    time: item.time,
    value: item.close,
  }));

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
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
        });

        const lineSeries = chart.addLineSeries({
            color: '#E4070A',
            lineWidth: 2,
            priceLineVisible: false, // Price line'ı da gizle
            lastValueVisible: false, // Son değer label'ını gizle
            priceFormat: {
                type: 'custom',
                formatter: (price) => {
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
                },
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
            return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
          }
        });
        
      </script>
    </body>
  </html>
  `;

  return (
    <View style={styles.flex1}>
      <WebView originWhitelist={['*']} source={{html}} style={styles.webView} />
    </View>
  );
};

export default memo(TradingViewLineChart);
