import {memo} from 'react';
import styles from './modalStyles';
import {SendingToCard} from '../../../../components';
import {RouteMergeIcon, SolanaBridgeIcon} from '../../../../assets/icons';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scaleSize} from '../../../../constants/dimensions';
import {Item} from '../SendSummary';
import {ellipsizeString, openSolscan} from '../../../../utils';
import {useTranslation} from 'react-i18next';
import {BlurView} from '@react-native-community/blur';
import i18n from '../../../../localization/i18n';
import {useWallet} from '../../../../hooks';

const TransactionResponse = () => {
  const {t} = useTranslation(['common', 'content']);
  const {sendModalData, setSendModalData, showTransactionModal} = useWallet();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showTransactionModal}
      onRequestClose={() => setSendModalData(undefined)}>
      <View style={styles.container}>
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="#000000"
          overlayColor="#000000"
        />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.overlay}>
            <View style={styles.headerContainer}>
              <View
                style={[
                  styles.imageWrapper,
                  styles.imageContainer,
                  styles.solImageContainer,
                ]}>
                {sendModalData?.symbol === 'SOL' ? (
                  <SolanaBridgeIcon
                    width={scaleSize(26.14)}
                    height={scaleSize(23.42)}
                  />
                ) : (
                  <Image
                    source={{uri: sendModalData?.mintImage}}
                    style={styles.imageContainer}
                    resizeMode="cover"
                  />
                )}
              </View>
              <Text
                style={
                  styles.mintAmountText
                }>{`${sendModalData?.amount} ${sendModalData?.symbol}`}</Text>
              <RouteMergeIcon
                color={'#676A6F'}
                width={scaleSize(8.77)}
                height={scaleSize(10.77)}
                style={styles.routeRotate}
              />
              <Text
                style={
                  styles.mintAmountUsdText
                }>{`$${sendModalData?.amountUsd.toFixed(2)}`}</Text>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.itemWrapper}>
                <Item
                  title={t('common:date')}
                  text={`${new Date().toLocaleDateString(i18n.language)}`}
                />
                <Item
                  title={t('common:status')}
                  text={'CONFIRMED'}
                  status="success"
                />
                <Item title={t('common:network')} text={'SOLANA'} />
                <Item
                  title={t('content:networkFee')}
                  text={`$${sendModalData && sendModalData.networkFee < 0.01 ? '<0.01' : sendModalData?.networkFee.toFixed(2)}`}
                />
                <Item
                  title={t('common:to')}
                  text={ellipsizeString(sendModalData?.to, 10, 10)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton]}
                  onPress={() => {
                    if (sendModalData) {
                      openSolscan(sendModalData.tx);
                    }
                    setSendModalData(undefined);
                  }}>
                  <Text style={[styles.buttonText, styles.buttonTextDark]}>
                    SOLSCAN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.closeButton]}
                  onPress={() => setSendModalData(undefined)}>
                  <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                    {t('close')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default memo(TransactionResponse);
