import {memo} from 'react';
import styles from './styles';
import {Text, TextStyle, View} from 'react-native';
import Image from './Img';
import type {DescriptionType} from './Top';
import {LongRightIcon, SolanaBridgeIcon} from '../../../assets/icons';
import {scaleSize} from '../../../constants/dimensions';
import {StatusTypes} from '../../../types';
import {NOTIFICATION} from '../../../constants/colors';

type Props = {
  type: StatusTypes;
  description: DescriptionType;
};

const SolImage = () => {
  const iconProps = {
    width: scaleSize(8.01),
    height: scaleSize(7.18),
  };

  return (
    <View style={[styles.imageContainer, styles.image, styles.solBg]}>
      <SolanaBridgeIcon />
    </View>
  );
};

const DetailDescription = ({description, type}: Props) => {
  const textStyles: TextStyle[] = [styles.descriptionText];

  if (type === 'warning') {
    textStyles.push(styles.warningText);
  } else if (type === 'success') {
    textStyles.push(styles.successText);
  } else if (type === 'error') {
    textStyles.push(styles.dangerText);
  }

  if (typeof description === 'string') {
    return <Text style={textStyles}>{description}</Text>;
  }

  const {imageUrl, swapType, fromAmount, toAmount, symbol} = description;
  return (
    <>
      {swapType === 'from' ? (
        <Image source={{uri: imageUrl}} type={type} />
      ) : (
        <SolImage />
      )}
      <Text
        style={
          textStyles
        }>{`${fromAmount} ${swapType === 'from' ? symbol : 'SOL'}`}</Text>
      <LongRightIcon
        width={scaleSize(11.47)}
        height={scaleSize(11.47)}
        color={
          type === 'warning'
            ? NOTIFICATION.WARNING.TEXT
            : type === 'success'
              ? NOTIFICATION.SUCCESS.TEXT
              : NOTIFICATION.DANGER.TEXT
        }
      />
      <Text
        style={
          textStyles
        }>{`${toAmount} ${swapType === 'from' ? 'SOL' : symbol}`}</Text>
      {swapType === 'to' ? (
        <Image source={{uri: imageUrl}} type={type} />
      ) : (
        <SolImage />
      )}
    </>
  );
};

const TopText = (props: Props) => {
  // const {imageUrl, swapType, fromAmount, toAmount, symbol} = description;
  // const textStyles: TextStyle[] = [styles.descriptionText];

  // if (type === 'warning') {
  //   textStyles.push(styles.warningText);
  // } else if (type === 'success') {
  //   textStyles.push(styles.successText);
  // } else if (type === 'error') {
  //   textStyles.push(styles.dangerText);
  // }

  return (
    <View style={styles.topDescriptionContainer}>
      <DetailDescription {...props} />
    </View>
  );
};

export default memo(TopText);
