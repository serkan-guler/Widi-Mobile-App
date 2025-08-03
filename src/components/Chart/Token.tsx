import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {ChartResponse} from '../../types';
import Svg, {
  Line,
  Defs,
  LinearGradient,
  Stop,
  Path,
  Circle,
} from 'react-native-svg';
import {scaleSize} from '../../constants/dimensions';
import {BORDER_COLORS} from '../../constants/colors';
import React from 'react';
import {formatNumber} from '../../utils';

type Props = {
  data: ChartResponse[];
};

const TokenChart = ({data}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const [chartLayout, setChartLayout] = useState<LayoutRectangle>();
  const [times, setTimes] = useState<number[]>([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [chartData, setChartData] = useState<ChartResponse[]>(data.slice(-10));

  const chartWidth = useMemo(
    () => (chartLayout ? chartLayout.width - scaleSize(60) : 289),
    [chartLayout],
  );
  const chartHeight = useMemo(
    () => (chartLayout ? chartLayout.height : 218),
    [chartLayout],
  );

  const xEnd = useMemo(
    () => chartWidth + scaleSize(60),
    [chartWidth, scaleSize],
  );

  useEffect(() => {
    const times: number[] = [];

    const isEven = data.length % 2 === 0;
    const startIndex = isEven ? 1 : 0;

    for (let i = startIndex; i < data.length; i += 2) {
      times.push(data[i].time);
    }

    setTimes(times);
    setScrollIndex(times.length - 5);
  }, [data]);

  useEffect(() => {
    const isEven = data.length % 2 === 0;
    const endIndex = isEven ? scrollIndex * 2 + 1 : scrollIndex * 2;
    const last10 = data.slice(Math.max(endIndex - 9, 0), endIndex + 1);
    setChartData(last10);
  }, [data, scrollIndex]);

  useEffect(() => {
    if (scrollViewRef.current && chartData.length > 0) {
      // Kısa bir delay ile scroll pozisyonunu ayarla
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({animated: false});
      }, 100);
    }
  }, [times.length]);

  const rawMin = useMemo(
    () => Math.min(...chartData.map(d => d.close)),
    [chartData],
  );
  const rawMax = useMemo(
    () => Math.max(...chartData.map(d => d.close)),
    [chartData],
  );

  const range = rawMax - rawMin;
  const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
  const base = magnitude / 2;

  const min = Math.floor(rawMin / base) * base;
  const max = Math.ceil(rawMax / base) * base;

  const getY = useCallback(
    (value: number) =>
      chartHeight - ((value - min) / (max - min)) * chartHeight,
    [chartHeight, min, max],
  );

  const points = useMemo(() => {
    return chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * chartWidth;
      const y = getY(d.close);
      return {x, y};
    });
  }, [chartData, chartWidth, getY]);

  const linePath = useMemo(() => {
    return points
      .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
      .join(' ');
  }, [points]);

  const areaPath = useMemo(
    () => `${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`,
    [chartWidth, chartHeight, linePath],
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const itemWidth = chartWidth / 5;
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / itemWidth);
      if (index > 0 && index < times.length - 1 && scrollIndex !== index) {
        setScrollIndex(index);
      }
    },
    [chartWidth, times.length, scrollIndex],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.wrapper}>
        <View
          style={styles.chartContainer}
          onLayout={event => {
            setChartLayout(event.nativeEvent.layout);
          }}>
          {chartLayout && (
            <Svg
              width={xEnd}
              height={chartHeight + scaleSize(5)}
              viewBox={`0 0 ${xEnd} ${chartHeight}`}>
              <Defs>
                <LinearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#D0111B8B" stopOpacity="0.55" />
                  <Stop offset="1" stopColor="#FF000000" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              {/* Y ekseni grid çizgileri */}
              {Array.from({length: 6}).map((_, i) => {
                const value = max - ((max - min) / 5) * i;
                const y = (i / 5) * chartHeight;
                return (
                  <React.Fragment key={`h-line-circle-${i}`}>
                    <Text
                      style={[
                        styles.text,
                        styles.yAxisLabel,
                        {top: y - scaleSize(16)},
                      ]}>
                      {`$${formatNumber(value, 2)}`}
                    </Text>
                    <Line
                      x1={0}
                      y1={y}
                      x2={xEnd}
                      y2={y}
                      stroke={BORDER_COLORS.LIGHT}
                      strokeWidth={1}
                    />
                    <Circle
                      cx={xEnd - scaleSize(3.5)}
                      cy={y}
                      r={scaleSize(2.5)}
                      stroke={BORDER_COLORS.LIGHT}
                      strokeWidth={scaleSize(1)}
                      fill={BORDER_COLORS.LIGHT}
                    />
                  </React.Fragment>
                );
              })}
              {/* Gradient alan */}
              <Path d={areaPath} fill="url(#lineGradient)" />
              {/* Ana çizgi */}
              <Path d={linePath} stroke="#E4070A" strokeWidth={2} fill="none" />
            </Svg>
          )}
        </View>
      </View>
      <View style={[styles.footer, {width: chartWidth}]}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
          snapToInterval={chartWidth / 5}
          onScroll={onScroll}
          scrollEventThrottle={16}>
          {times.map((time, i) => (
            <View
              key={`x-axis-label-${i}`}
              style={[styles.footerTextWrapper, {width: chartWidth / 5}]}>
              {i > 0 && <View style={styles.lineWrapper} />}
              <Text style={[styles.text, styles.xAxisLabel]}>
                {new Date(time * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default memo(TokenChart);
