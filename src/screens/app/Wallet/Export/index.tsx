import {memo, useEffect, useState} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSession, useSize} from '../../../../hooks';
import StatusBar from '../../../../components/common/Layout/StatusBar';
import {Header, Notification, PageLoading} from '../../../../components';
import {AppStackScreenProps} from '../../../../types';
import {Logo} from '../../../../assets/logos';
import {COLORS} from '../../../../constants/colors';
import {scaleSize} from '../../../../constants/dimensions';
import {copyToClipboard, ellipsizeString} from '../../../../utils';
import {showAlert, showErrorAlert} from '../../../../utils/alert';
import WalletManager from '../../../../lib/WalletManager';

const ExportWalletScreen = ({
  navigation,
}: AppStackScreenProps<'ExportWallet'>) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);
  const {
    safeArea: {top, bottom},
  } = useSize();
  const {user} = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [secret, setSecret] = useState<string>();

  useEffect(() => {
    const fetchSecret = async () => {
      const response = await WalletManager.getWalletSecret();

      if (response.success) {
        setSecret(response.privateKey);
        setIsLoading(false);
      } else {
        showAlert('error', response.message, [
          {
            text: t('common:close'),
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    };
    fetchSecret();
  }, []);

  if (!user || isLoading || !secret) {
    return <PageLoading />;
  }

  return (
    <View style={[styles.container, {paddingTop: top, paddingBottom: bottom}]}>
      <View>
        <StatusBar />
        <Header
          title={t('common:exportWallet')}
          onPressBack={() => navigation.goBack()}
        />
        <View style={styles.notificationContainer}>
          <Notification
            type="warning"
            message={t('content:doNotShareWallet')}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardLeftContainer}>
            <Logo
              color={COLORS.DANGER}
              width={scaleSize(24)}
              height={scaleSize(20)}
            />
            <View style={styles.textContainer}>
              <Text style={[styles.titleText, styles.titleLeftText]}>
                Export Wallet
              </Text>
              <Text style={[styles.titleText, styles.titleRightText]}>
                {ellipsizeString(user.wallet, 4, 4, 3)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cardCopyButton}
            onPress={() => copyToClipboard(user.wallet)}>
            <Text style={styles.cardCopyButtonText}>{t('common:copy')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.copyButton}
        onPress={() => copyToClipboard(secret)}>
        <Text style={styles.copyText}>{t('content:copyYourPrivateKey')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ExportWalletScreen);
