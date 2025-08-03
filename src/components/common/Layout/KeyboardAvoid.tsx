import {memo, PropsWithChildren} from 'react';
import styles from './styles';
import {
  KeyboardAvoidingView,
  Platform,
  KeyboardAvoidingViewProps,
} from 'react-native';

type Props = {
  gap?: boolean;
} & KeyboardAvoidingViewProps;

const KeyboardAvoid = ({
  children,
  gap = false,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  const keyboardOffset = 10;
  const behavior: 'height' | 'position' | 'padding' | undefined =
    Platform.select({
      ios: 'padding',
      android: 'height',
      default: 'height',
    });

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      style={[
        styles.flex,
        gap && styles.gap,
        style,
        // {paddingTop: headerHeight},
        // padding && styles.padding,
      ]}
      keyboardVerticalOffset={keyboardOffset}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default memo(KeyboardAvoid);
