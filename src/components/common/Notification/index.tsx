import {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {
  CancelCircleIcon,
  SuccessCircleIcon,
  WarningIcon,
} from '../../../assets/icons';
import {NOTIFICATION} from '../../../constants/colors';
import {scaleSize} from '../../../constants/dimensions';
import {StatusTypes} from '../../../types';

type Props = {
  type?: StatusTypes;
  message: string;
  onPress?: () => void;
};

const Icon = ({type}: {type: StatusTypes}) => {
  if (type === 'error') {
    return <CancelCircleIcon color={NOTIFICATION.DANGER.TEXT} />;
  }
  if (type === 'warning') {
    return <WarningIcon />;
  }
  if (type === 'success') {
    return <SuccessCircleIcon />;
  }
};

const Notification = ({type = 'success', message, onPress}: Props) => {
  const view = [
    styles.container,
    type === 'error'
      ? styles.dangerContainer
      : type === 'warning'
        ? styles.warningContainer
        : styles.successContainer,
  ];

  const text = [
    styles.text,
    type === 'error'
      ? styles.dangerText
      : type === 'warning'
        ? styles.warningText
        : styles.successText,
  ];

  return (
    <View style={view} onTouchEnd={onPress}>
      <Icon type={type} />
      <Text style={text} numberOfLines={3} ellipsizeMode="tail">
        {message}
      </Text>
    </View>
  );
};

export default memo(Notification);
