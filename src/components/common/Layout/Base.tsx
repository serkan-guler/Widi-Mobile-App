import {memo} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {LayoutProps} from '../../../types';
import {PageLoading} from '../../loading';
import KeyboardAvoid from './KeyboardAvoid';
// import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StatusBar from './StatusBar';

const BaseLayout = ({
  isLoading = false,
  padding = true,
  children,
}: LayoutProps & {padding?: boolean}) => {
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return <PageLoading />;
  }

  /* return (
    <>
      <StatusBar
        animated={true}
        barStyle="light-content"
        showHideTransition="fade"
        backgroundColor={COLORS.DARK}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          styles.container,
          // {paddingTop: headerHeight},
          padding && styles.padding,
        ]}
        keyboardVerticalOffset={keyboardOffset}>
        {children}
      </KeyboardAvoidingView>
    </>
  ); */

  return (
    <View
      style={[
        styles.container,
        styles.between,
        {paddingTop: insets.top},
        padding && styles.padding,
      ]}>
      <StatusBar />
      <KeyboardAvoid>{children}</KeyboardAvoid>
    </View>
  );
};

export default memo(BaseLayout);
