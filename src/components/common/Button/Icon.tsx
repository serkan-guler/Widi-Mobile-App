import {memo} from 'react';
import styles from './styles';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

type Props = TouchableOpacityProps & {
  bgColor?: 'dark';
};

const IconButton = ({children, bgColor, ...props}: Props) => {
  const {style, disabled, ...restProps} = props;
  return (
    <TouchableOpacity
      {...restProps}
      disabled={disabled}
      style={[
        style ?? styles.iconContainer,
        !bgColor ? styles.bgDefault : bgColor === 'dark' ? styles.bgDark : {},
        disabled && styles.disabled,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default memo(IconButton);
