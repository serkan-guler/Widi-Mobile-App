import {memo, PropsWithChildren, ReactNode} from 'react';
import styles from './styles';
import {View, Modal, Text, TouchableOpacity, Image} from 'react-native';
import {useSize} from '../../hooks';
import {Logo} from '../../assets/logos';
import {useTranslation} from 'react-i18next';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/dimensions';

type Props = {
  visible: boolean;
  contentColor?: 'tertiary' | 'default';
  topContent?: ReactNode;
  buttonText?: string;
  logo?: ReactNode;
  onPress?: () => void;
  onClose: () => void;
};

const ModalComponent = ({
  visible,
  contentColor = 'default',
  logo,
  buttonText,
  onPress,
  onClose,
  topContent,
  children,
}: PropsWithChildren<Props>) => {
  const {t} = useTranslation('common');
  const {
    safeArea: {bottom},
  } = useSize();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="#000000"
          overlayColor="#000000"
        />
        <View style={styles.wrapper}>
          <View style={styles.logo}>
            {logo || <Logo color={COLORS.DARK} />}
          </View>
          {topContent && (
            <View
              style={[
                styles.topContent,
                styles.overlayDefault,
                styles.borderTop,
              ]}>
              {topContent}
            </View>
          )}
          <View
            style={[
              styles.overlay,
              styles.borderTop,
              contentColor === 'default'
                ? styles.overlayDefault
                : styles.overlayTertiary,
              {paddingBottom: bottom > 0 ? SPACING.PAGE_BOTTOM : SPACING.MD_LG},
            ]}>
            {children}
            <View style={styles.buttonsContainer}>
              {onPress && buttonText && (
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={onPress}>
                  <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                    {buttonText}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={onClose}>
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                  {t('close')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalComponent);
