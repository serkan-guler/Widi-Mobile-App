import {memo, useCallback, useState} from 'react';
import styles from './styles';
import {
  BrandCard,
  Header,
  IconButton,
  Modal,
  PageHeaderCard,
  SearchInput,
  StatusBadge,
} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Logo} from '../../../../assets/logos';
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
  SolanaDarkIcon,
} from '../../../../assets/icons';
import {scaleSize} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';
import ReceiveModal from './Receive';
import TransactionResponseModal from './TransactionResponse';
import {useWallet} from '../../../../hooks';

type Props = {
  handleExportWallet: () => void;
  handleGetDomain: () => void;
  walletAddress: string;
  handleSendToken: () => void;
};

const HeaderComponent = ({
  handleExportWallet,
  handleGetDomain,
  walletAddress,
  handleSendToken,
}: Props) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {
    selectedTabIndex,
    setSelectedTabIndex,
    balance,
    totalChange,
    widiDomains,
    searchText,
    handleSearchTextChange,
    tokensIsLoading,
    showDomainModal,
    domainModalData,
    closeDomainModal,
    tokens,
  } = useWallet();

  const [openReceiveModal, setOpenReceiveModal] = useState(false);

  const handleCloseReceiveModal = useCallback(() => {
    setOpenReceiveModal(false);
  }, []);

  const labels = [
    {
      label: t('content:tokens'),
      isLoading: tokensIsLoading,
    },
    {
      label: t('content:activity'),
      isLoading: false,
    },
    {
      label: `${t('content:myOrderHistory')} (2)`,
      isLoading: false,
    },
    {
      label: t('content:myEarnings'),
      isLoading: false,
    },
  ];

  return (
    <>
      <ReceiveModal
        visible={openReceiveModal}
        onClose={handleCloseReceiveModal}
        widiName={widiDomains[0]}
      />
      <TransactionResponseModal />
      {domainModalData && (
        <Modal
          visible={showDomainModal}
          buttonText={t('common:solscan')}
          onPress={() => {
            openURL(domainModalData.tx);
            closeDomainModal();
          }}
          onClose={() => {
            closeDomainModal();
          }}>
          <View style={styles.successCopiedContainer}>
            <Text style={styles.successCopiedText}>
              {t('content:successfullyWidiDomain', {
                domain: domainModalData.domain,
              })}
            </Text>
          </View>
        </Modal>
      )}
      <View style={styles.container}>
        <Header title={t('navigation:wallet')} />
        <View style={[styles.titleContainer, styles.paddingContainer]}>
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
                      {ellipsizeString(walletAddress, 4, 4, 3)}
                    </Text>
                  </View>
                  <IconButton
                    bgColor="dark"
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(walletAddress)}>
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
                      {balance ? formatNumber(tokens?.total, 2) : '0.00'}
                    </Text>
                  </View>
                  <View style={styles.cardChildrenBalanceSolContainer}>
                    <SolanaDarkIcon />
                    <Text style={styles.cardChildrenBalanceSolText}>
                      {tokens?.totalSol
                        ? formatNumber(tokens?.totalSol, 3)
                        : '0.000'}
                    </Text>
                  </View>
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
              <Text style={[styles.cardButtonText, styles.cardButtonTextWhite]}>
                {t('common:receive')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.border, styles.card, styles.cardActionButton]}
            onPress={handleExportWallet}>
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
        <View style={styles.paddingContainer}>
          <Text style={styles.subTitle}>{t('content:buyWidiDomain')}</Text>
          <View style={styles.getDomainContainer}>
            <TouchableOpacity
              style={styles.widiDomainButton}
              onPress={handleGetDomain}>
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
        </View>
        <View style={[styles.content, styles.paddingContainer]}>
          <PageHeaderCard title={t('navigation:token')} />
          {selectedTabIndex === 0 && (
            <SearchInput
              placeholder={t('common:searchToken')}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
          )}
        </View>
        <ScrollView
          contentContainerStyle={styles.tabScrollContentStyle}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTabIndex(index)}
              style={[
                styles.tabButton,
                selectedTabIndex === index
                  ? styles.tabButtonActive
                  : styles.tabButtonDefault,
              ]}>
              {label.isLoading ? (
                <ActivityIndicator size="small" color={COLORS.WHITE} />
              ) : (
                <Text
                  style={[
                    styles.tabButtonText,
                    selectedTabIndex === index
                      ? styles.tabButtonTextActive
                      : styles.tabButtonTextDefault,
                  ]}>
                  {label.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default memo(HeaderComponent);
