import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles';
import {
  BaseButton,
  KeyboardAvoid,
  LayoutStatusBar,
  TokenCard,
} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {FlatList, Keyboard, View} from 'react-native';
import {scaleSize} from '../../../../constants/dimensions';
import {AppStackScreenProps, TokenResponse} from '../../../../types';
import {useSize, useWebSocket} from '../../../../hooks';
import {fetchCopiedText, setSearchToken} from '../../../../utils';
import ListHeader from './ListHeader';
import Empty from './Empty';
import {SCREEN_NAMES} from '../../../../constants/navigation';

const SearchTokenScreen = (props: AppStackScreenProps<'TokenSearch'>) => {
  const {navigation} = props;
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {
    safeArea: {top, bottom},
  } = useSize();
  const {sendMessage, onTokenSearchResult, offTokenSearchResult} =
    useWebSocket();

  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<TokenResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchTextRef = useRef<string>('');

  const submitting = useMemo(() => isSubmitting, [isSubmitting]);

  const handlePaste = useCallback(async () => {
    const text = await fetchCopiedText();

    if (text) {
      setSearchText(text);
    }
  }, [fetchCopiedText]);

  const handleDone = useCallback(() => {
    if (searchText.trim() === '') return;

    if (
      searchText.trim().toLowerCase() !== searchTextRef.current.toLowerCase()
    ) {
      Keyboard.dismiss();
      setIsSubmitting(true);
      setSearchData([]);
      searchTextRef.current = searchText.trim();

      sendMessage('searchToken', searchText);
    }
  }, [searchText, sendMessage]);

  const handleRenderItem = useCallback(
    ({item}: {item: TokenResponse}) => (
      <TokenCard
        token={item}
        time={'24h'}
        onPress={async () => {
          await setSearchToken(item);
          navigation.navigate(SCREEN_NAMES.APP.TOKEN_DETAIL, {
            mint: item.mint,
            pool: item.poolId,
          });
        }}
      />
    ),
    [navigation],
  );

  useEffect(() => {
    const handleSearchResult = (data: TokenResponse[]) => {
      if (data.length > 0) {
        setSearchData(data);
      }
      setIsSubmitting(false);
    };

    onTokenSearchResult(handleSearchResult);

    return () => {
      offTokenSearchResult(handleSearchResult);
    };
  }, []);

  return (
    <>
      <LayoutStatusBar />
      <View style={[styles.container, {paddingTop: top}]}>
        <KeyboardAvoid>
          <FlatList
            style={[styles.scrollContainer]}
            contentContainerStyle={[
              styles.paddingContainer,
              styles.scrollContentContainer,
            ]}
            data={searchData}
            renderItem={handleRenderItem}
            keyExtractor={item => `${item.mint}-${item.poolId}`}
            ListHeaderComponent={
              <ListHeader
                {...props}
                searchText={searchText}
                setSearchText={setSearchText}
                handlePaste={handlePaste}
                handleDone={handleDone}
              />
            }
            ListEmptyComponent={<Empty isSubmitting={submitting} {...props} />}
          />
          <View
            style={[
              styles.doneContainer,
              {
                paddingBottom:
                  bottom > 0 ? bottom + scaleSize(8) : scaleSize(20),
              },
            ]}
            onLayout={e => {
              const {height} = e.nativeEvent.layout;
              // setNextTextHeight(height);
            }}>
            <BaseButton
              label={t('common:done')}
              size="medium"
              onPress={handleDone}
              disabled={!searchText || isSubmitting}
            />
          </View>
        </KeyboardAvoid>
      </View>
    </>
  );
};

export default memo(SearchTokenScreen);
