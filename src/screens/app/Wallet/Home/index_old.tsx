import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './styles_old';
import {
  BaseButton,
  BrandCard,
  Header,
  IconButton,
  Modal,
  PageHeaderCard,
  PageLoading,
  ScrollLayout,
  SearchInput,
  StatusBadge,
  Tabs,
  WalletTokenCard,
} from '../../../../components';
import WalletTokenExampleCard from '../../../../components/cards/Wallet/TokenExample';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View, Linking} from 'react-native';
import {Logo} from '../../../../assets/logos';
import {scaleSize} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';
import {
  copyToClipboard,
  ellipsizeString,
  formatNumber,
  openURL,
  toLocaleUpperCase,
} from '../../../../utils';
import {
  DownloadsIcon,
  LaunchExpandedIcon,
  LaunchNarrowedDownIcon,
  SNSIcon,
} from '../../../../assets/icons';
import {exampleTokens} from '../../../../lib/exampleData';
import {
  MainTabScreenProps,
  PnLResponse,
  WalletResponse,
} from '../../../../types';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {useSession} from '../../../../hooks';
import {getWalletService} from '../../../../services';
import {showAlert, showErrorAlert} from '../../../../utils/alert';
import ReceiveModal from './Receive';

const WalletScreen = ({route, navigation}: MainTabScreenProps<'Wallet'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content', 'errors']);
  const {user} = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [domain, setDomain] = useState('');
  const [dbDomain, setDbDomain] = useState<string>();
  const [tx, setTx] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [openReceiveModal, setOpenReceiveModal] = useState(false);

  const [tokens, setTokens] = useState<WalletResponse>({
    tokens: [],
    total: 0,
    totalSol: 0,
    timestamp: '',
  });
  const [totalChange, setTotalChange] = useState(0);
  const [pnlData, setPnlData] = useState<PnLResponse>();

  const handleCloseReceiveModal = useCallback(() => {
    setOpenReceiveModal(false);
  }, []);

  const handleTabChange = useCallback(
    (index: number) => {
      setTabIndex(index);
      if (index !== 0) {
        setSearchText('');
      }
    },
    [setTabIndex],
  );

  const handleChangeText = (e: string) => {
    setSearchText(e.trim());
  };

  const sendTokenData = useMemo(
    () =>
      tokens.tokens.map(token => ({
        mint: token.token.mint,
        image: token.token.image,
        name: token.token.name,
        symbol: token.token.symbol,
        count: token.balance,
        decimal: token.token.decimals,
      })),
    [tokens.tokens],
  );

  const handleSendToken = useCallback(() => {
    if (sendTokenData.length === 0) {
      showAlert('error', t('errors:haveNotToken'));
    } else {
      navigation.getParent()?.navigate(SCREEN_NAMES.APP.SELECT_SEND_TOKEN, {
        data: sendTokenData,
      });
    }
  }, [sendTokenData, navigation, t]);

  const labels = [
    t('content:tokens'),
    t('content:activity'),
    t('content:copyBalance'),
    t('content:myEarnings'),
  ];

  useEffect(() => {
    const tx = route.params?.tx;
    const d = route.params?.domain;
    if (tx && tx !== '') {
      setTx(tx);
      setShowModal(true);
    } else {
      setTx('');
      setShowModal(false);
    }
    setDomain(d || '');
    navigation.setParams({tx: undefined, domain: undefined});
  }, [route.params?.tx]);

  useEffect(() => {
    const getData = async () => {
      const response = await getWalletService();

      if (response.status === 'success') {
        console.log('Wallet data:', response.data);
        setTokens(response.data.tokens);
        setPnlData(response.data.pnl);
        setTotalChange(response.data.pnl.historic.summary['30d'].totalChange);
        setIsLoading(false);
        if (response.data.widiDomain.length > 0) {
          const name = response.data.widiDomain.find(name =>
            name.includes('.widi'),
          );
          setDbDomain(name);
        } else {
          setDbDomain(undefined);
        }
      } else {
        showErrorAlert(response);
      }
    };

    getData();
  }, []);

  const tokensFiltered = useMemo(() => {
    if (!searchText) {
      return tokens.tokens;
    }
    const normalizedSearchText = searchText.toLowerCase().trim();
    return tokens.tokens.filter(
      token =>
        token.token.name.toLowerCase().includes(normalizedSearchText) ||
        token.token.symbol.toLowerCase().includes(normalizedSearchText) ||
        token.token.mint.includes(searchText),
    );
  }, [tokens.tokens, searchText]);

  if (!user || !pnlData) {
    return <PageLoading />;
  }

  return (
    <>
      <ReceiveModal
        visible={openReceiveModal}
        onClose={handleCloseReceiveModal}
        widiName={dbDomain}
      />
      <ScrollLayout isLoading={isLoading}>
        <Modal
          visible={showModal}
          buttonText={t('common:solscan')}
          onPress={() => {
            openURL(tx);
            setShowModal(false);
          }}
          onClose={() => {
            setShowModal(false);
          }}>
          <View style={styles.successCopiedContainer}>
            <Text style={styles.successCopiedText}>
              {t('content:successfullyWidiDomain', {domain})}
            </Text>
          </View>
        </Modal>
        <Header title={t('navigation:wallet')} />
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <BrandCard
              content={
                <View style={[styles.cardContentContainer, styles.border]}>
                  <View style={[styles.cardContentWrapper]}>
                    <Logo
                      width={scaleSize(20)}
                      height={scaleSize(17)}
                      color={COLORS.DANGER}
                    />
                    <View style={styles.cardContentTextContainer}>
                      <Text style={[styles.cardText, styles.cardTextTitle]}>
                        {t('common:yourWalletAddress')}
                      </Text>
                      <Text style={[styles.cardText, styles.cardTextAddress]}>
                        {ellipsizeString(user?.wallet || '', 4, 4, 3)}
                      </Text>
                    </View>
                    <IconButton
                      bgColor="dark"
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(user.wallet)}>
                      <Text style={styles.copyText}>{t('common:copy')}</Text>
                    </IconButton>
                  </View>
                  <View style={[styles.cardChildrenContainer, styles.border]}>
                    <Text style={styles.cardChildrenTitle}>
                      {toLocaleUpperCase(t('common:balance'))}
                    </Text>
                    <View style={styles.cardChildrenBalanceContainer}>
                      <Text style={styles.cardChildrenBalanceIconText}>$</Text>
                      <Text style={styles.cardChildrenBalanceText}>
                        {formatNumber(tokens.total, 2)}
                      </Text>
                    </View>
                    <StatusBadge
                      type={totalChange <= 0 ? 'danger' : 'success'}
                      label={`$${totalChange.toFixed(2)}`}
                    />
                  </View>
                </View>
              }
            />
            <View style={styles.cardActionContainer}>
              <TouchableOpacity
                style={[styles.border, styles.card, styles.cardActionButton]}
                onPress={handleSendToken}>
                <LaunchExpandedIcon
                  width={scaleSize(22)}
                  height={scaleSize(22)}
                  color={COLORS.PRIMARY}
                />
                <Text
                  style={[styles.cardButtonText, styles.cardButtonTextPrimary]}>
                  {t('common:send')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.border, styles.card, styles.cardActionButton]}
                onPress={() => setOpenReceiveModal(true)}>
                <LaunchNarrowedDownIcon
                  width={scaleSize(22)}
                  height={scaleSize(22)}
                  color={COLORS.WHITE}
                />
                <Text
                  style={[styles.cardButtonText, styles.cardButtonTextWhite]}>
                  {t('common:receive')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.border, styles.card, styles.cardActionButton]}
              onPress={() =>
                navigation.getParent()?.navigate(SCREEN_NAMES.APP.EXPORT_WALLET)
              }>
              <DownloadsIcon
                width={scaleSize(22)}
                height={scaleSize(22)}
                color={COLORS.WHITE}
                style={styles.downloadIcon}
              />
              <Text style={[styles.cardButtonText, styles.cardButtonTextWhite]}>
                {t('common:exportWallet')}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitle}>{t('content:buyWidiDomain')}</Text>
          <View style={styles.getDomainContainer}>
            {/* <BaseButton
              size="medium"
              label={t('content:getWidiDomain')}
              onPress={() =>
                navigation.getParent()?.navigate(SCREEN_NAMES.APP.DOMAIN)
              }
            /> */}
            <TouchableOpacity
              style={styles.widiDomainButton}
              onPress={() =>
                navigation.getParent()?.navigate(SCREEN_NAMES.APP.DOMAIN)
              }>
              <Text style={styles.widiDomainText}>
                {t('content:getWidiDomain')}
              </Text>
            </TouchableOpacity>
            <View style={styles.snsContainer}>
              <Text style={styles.snsText}>
                {t('common:poweredBy', {name: 'SNS'})}
              </Text>
              <SNSIcon color="#b4fc75" />
            </View>
          </View>
          <View style={styles.content}>
            <PageHeaderCard title={t('navigation:token')} />
            {tabIndex === 0 && (
              <SearchInput
                placeholder={t('common:searchToken')}
                value={searchText}
                onChangeText={handleChangeText}
              />
            )}
            <Tabs
              scrollAnimation
              labels={labels}
              onTabPress={handleTabChange}
              activeIndex={tabIndex}>
              <Tabs.Content>
                {tokensFiltered.length > 0 ? (
                  tokensFiltered.map((token, index) => (
                    <WalletTokenCard
                      {...token}
                      navigation={navigation}
                      pnl={pnlData}
                      key={index}
                    />
                  ))
                ) : (
                  <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                      {t('errors:tokenNotFound')}
                    </Text>
                  </View>
                )}
              </Tabs.Content>
              <Tabs.Content>
                {exampleTokens.map((token, index) => (
                  <WalletTokenExampleCard {...token} key={index} />
                ))}
              </Tabs.Content>
              <Tabs.Content>
                {exampleTokens.map((token, index) => (
                  <WalletTokenExampleCard {...token} key={index} />
                ))}
              </Tabs.Content>
              <Tabs.Content>
                {exampleTokens.map((token, index) => (
                  <WalletTokenExampleCard {...token} key={index} />
                ))}
              </Tabs.Content>
            </Tabs>
          </View>
        </View>
      </ScrollLayout>
    </>
  );
};

export default memo(WalletScreen);
