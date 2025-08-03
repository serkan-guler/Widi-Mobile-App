import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles';
import {
  BaseButton,
  Header,
  ScrollLayout,
  PageHeaderCard,
} from '../../../../components';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AppStackScreenProps} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {useFilter} from '../../../../hooks';
import {useFocusEffect} from '@react-navigation/native';
import {COLORS} from '../../../../constants/colors';

const TokenFilterScreen = ({
  navigation,
}: AppStackScreenProps<'TokenFilter'>) => {
  const {t} = useTranslation('common');
  const {tokenFilter, setTokenFilter, resetTokenFilter} = useFilter();

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [marketCapMin, setMarketCapMin] = useState<string>('');
  const [marketCapMax, setMarketCapMax] = useState<string>('');
  const [volumeMin, setVolumeMin] = useState<string>('');
  const [volumeMax, setVolumeMax] = useState<string>('');
  const [liquidityMin, setLiquidityMin] = useState<string>('');
  const [liquidityMax, setLiquidityMax] = useState<string>('');

  const getNumericValue = useCallback((value: string) => {
    const numericValue = parseInt(value);
    return isNaN(numericValue) ? 0 : numericValue;
  }, []);

  const handleFilterResult = useCallback(() => {
    if (
      getNumericValue(marketCapMin) !== tokenFilter.marketCap.min ||
      getNumericValue(marketCapMax) !== tokenFilter.marketCap.max ||
      getNumericValue(volumeMin) !== tokenFilter.volume.min ||
      getNumericValue(volumeMax) !== tokenFilter.volume.max ||
      getNumericValue(liquidityMin) !== tokenFilter.liquidity.min ||
      getNumericValue(liquidityMax) !== tokenFilter.liquidity.max
    ) {
      setTokenFilter({
        marketCap: {
          min: getNumericValue(marketCapMin),
          max: getNumericValue(marketCapMax),
        },
        volume: {
          min: getNumericValue(volumeMin),
          max: getNumericValue(volumeMax),
        },
        liquidity: {
          min: getNumericValue(liquidityMin),
          max: getNumericValue(liquidityMax),
        },
      });
    }
    setTimeout(() => navigation.goBack(), 100);
  }, [
    marketCapMin,
    marketCapMax,
    volumeMin,
    volumeMax,
    liquidityMin,
    liquidityMax,
  ]);

  const focusNextInput = useCallback((index: number) => {
    const nextIndex = index + 1;
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Son input'ta klavyeyi kapat
      inputRefs.current[index]?.blur();
    }
  }, []);

  const handleSet = useCallback(
    (value: string, setValue: Dispatch<SetStateAction<string>>) => {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setValue(numericValue.toString());
      } else {
        if (value === '') {
          setValue('');
        }
      }
    },
    [],
  );

  const handleFocus = useCallback(() => {
    Object.entries(tokenFilter).forEach(([key, value]) => {
      const minValue = value.min > 0 ? value.min.toString() : '';
      const maxValue = value.max > 0 ? value.max.toString() : '';

      switch (key) {
        case 'marketCap':
          setMarketCapMin(minValue);
          setMarketCapMax(maxValue);
          break;
        case 'volume':
          setVolumeMin(minValue);
          setVolumeMax(maxValue);
          break;
        case 'liquidity':
          setLiquidityMin(minValue);
          setLiquidityMax(maxValue);
          break;
      }
    });
  }, [tokenFilter]);

  useFocusEffect(handleFocus);

  const data = {
    marketCap: {
      min: {
        value: marketCapMin,
        setValue: setMarketCapMin,
      },
      max: {
        value: marketCapMax,
        setValue: setMarketCapMax,
      },
    },
    volume: {
      min: {
        value: volumeMin,
        setValue: setVolumeMin,
      },
      max: {
        value: volumeMax,
        setValue: setVolumeMax,
      },
    },
    liquidity: {
      min: {
        value: liquidityMin,
        setValue: setLiquidityMin,
      },
      max: {
        value: liquidityMax,
        setValue: setLiquidityMax,
      },
    },
  };

  return (
    <ScrollLayout>
      <Header
        title={t('filters')}
        onPressBack={() => navigation.goBack()}
        trailing={
          <TouchableOpacity
            style={styles.trailingContainer}
            onPress={resetTokenFilter}>
            <Text style={styles.trailingText}>{t('clearAll')}</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          {Object.entries(data).map(([key, value], index) => (
            <View style={styles.filterWrapper} key={key}>
              <PageHeaderCard
                title={`${t(key)} ($)`}
                fontSize={20}
                lineHeight={25}
                letterSpacing={-0.4}
              />
              {Object.entries(value).map(([subKey, subValue], subIndex) => {
                const currentIndex = index * 2 + subIndex;
                return (
                  <TextInput
                    key={subKey}
                    ref={el => {
                      inputRefs.current[currentIndex] = el;
                    }}
                    placeholder={subKey === 'min' ? 'Min' : 'Max'}
                    value={subValue.value}
                    style={styles.input}
                    placeholderTextColor={COLORS.PRIMARY}
                    keyboardType="numeric"
                    keyboardAppearance="dark"
                    returnKeyType={currentIndex >= 5 ? 'done' : 'next'}
                    submitBehavior="blurAndSubmit"
                    onChangeText={e => handleSet(e, subValue.setValue)}
                    onSubmitEditing={() => focusNextInput(currentIndex)}
                    contextMenuHidden
                    clearButtonMode="always"
                  />
                );
              })}
            </View>
          ))}
        </View>
        <BaseButton label={t('filterResult')} onPress={handleFilterResult} />
      </View>
    </ScrollLayout>
  );
};

export default memo(TokenFilterScreen);
