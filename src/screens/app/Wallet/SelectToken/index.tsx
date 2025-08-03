import {memo, useEffect, useState} from 'react';
import styles from './styles';
import {AppStackScreenProps} from '../../../../types';
import {Header, RecentCard, ScrollLayout} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {Text, TextInput, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';

const SelectTokenScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'SelectSendToken'>) => {
  const {t} = useTranslation(['navigation', 'common']);

  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState(route.params?.data || []);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (route.params) {
      setIsLoading(false);
    }
  }, []);

  return (
    <ScrollLayout isLoading={isLoading}>
      <Header
        title={t('navigation:token')}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('common:searchToken')}
          placeholderTextColor={COLORS.WHITE}
          autoCapitalize="none"
          autoCorrect={false}
          enterKeyHint="search"
          keyboardAppearance="dark"
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            if (text.trim() === '') {
              setTokens(route.params?.data || []);
            } else {
              const filteredTokens = route.params?.data.filter(
                token =>
                  token.name.toLowerCase().includes(text.toLowerCase()) ||
                  token.symbol.toLowerCase().includes(text.toLowerCase()),
              );
              setTokens(filteredTokens);
            }
          }}
          returnKeyType="search"
          clearButtonMode="while-editing"
          cursorColor={COLORS.WHITE}
          selectionColor={COLORS.WHITE}
        />
      </View>
      {tokens.length > 0 ? (
        tokens.map((token, index) => (
          <RecentCard
            key={index}
            mint={token.name === 'Wrapped SOL' ? 'SOL' : token.name}
            image={token.image}
            description={`${token.count.toFixed(4)} ${token.symbol}`}
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.APP.CHECK_SEND_WALLET, {
                mint: token.mint,
                decimal: token.decimal,
                count: token.count,
                symbol: token.symbol,
                image: token.image,
              });
            }}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('common:noDataAvailable')}</Text>
        </View>
      )}
    </ScrollLayout>
  );
};

export default memo(SelectTokenScreen);
