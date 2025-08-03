import {memo, useCallback, useMemo, useState} from 'react';
import styles from './styles';
import {
  MainTabScreenProps,
  WalletTabType,
  WalletTokenDetail,
} from '../../../../types';
import {FlatList, Text, View} from 'react-native';
import {PageLoading, WalletTokenCard} from '../../../../components';
import {useSession, useSize, useWallet} from '../../../../hooks';
import HeaderComponent from './HeaderComponent';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {showAlert} from '../../../../utils/alert';
import {useTranslation} from 'react-i18next';

const WalletScreen = ({navigation}: MainTabScreenProps<'Wallet'>) => {
  const {t} = useTranslation(['errors']);
  const {tokens, pnlData, sendTokenData} = useWallet();
  const {user} = useSession();
  const {
    safeArea: {top},
  } = useSize();

  const [tabExampleData, setTabExampleData] = useState<WalletTabType[]>([
    {
      name: 'Serkan',
      surname: 'Güler',
    },
    {
      name: 'Serdar',
      surname: 'Güler',
    },
    {
      name: 'Dilek',
      surname: 'Güler',
    },
  ]);

  const handleRenderItem = useCallback(({item}: {item: WalletTabType}) => {
    return (
      <Text style={{color: 'white'}}>
        {item.name} {item.surname}
      </Text>
    );
  }, []);

  const handleExportWallet = useCallback(() => {
    navigation.getParent()?.navigate(SCREEN_NAMES.APP.EXPORT_WALLET);
  }, [navigation]);

  const handleGetDomain = useCallback(() => {
    navigation.getParent()?.navigate(SCREEN_NAMES.APP.DOMAIN);
  }, [navigation]);

  const handleSendToken = useCallback(() => {
    if (sendTokenData.length === 0) {
      showAlert('error', t('errors:haveNotToken'));
    } else {
      navigation.getParent()?.navigate(SCREEN_NAMES.APP.SELECT_SEND_TOKEN, {
        data: sendTokenData,
      });
    }
  }, [sendTokenData, navigation, t]);

  if (!user || !pnlData) {
    return <PageLoading />;
  }

  return (
    <FlatList
      style={[styles.container, {marginTop: top}]}
      contentContainerStyle={styles.paddingBottom}
      data={tabExampleData}
      renderItem={handleRenderItem}
      keyExtractor={item => item.name}
      ListHeaderComponent={
        <HeaderComponent
          handleExportWallet={handleExportWallet}
          walletAddress={user.wallet}
          handleGetDomain={handleGetDomain}
          handleSendToken={handleSendToken}
        />
      }
    />
  );
};

export default memo(WalletScreen);
