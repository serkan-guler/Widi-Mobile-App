import {TextInputProps} from 'react-native';
import {COLORS} from '../../constants/colors';

export {default as Header} from './Navigation/Header';
export {default as BottomTabs} from './Navigation/BottomTabs';
export {default as Layout} from './Layout/Base';
export {default as ScrollLayout} from './Layout/Scroll';
export {default as LayoutStatusBar} from './Layout/StatusBar';
export {default as KeyboardAvoid} from './Layout/KeyboardAvoid';
export * from './Button';
export * from './Badge';
export * from './Solana';
export {default as Notification} from './Notification';
export {default as TopNotification} from './Notification/Top';
export {default as Img} from './Image';

// Forms
export {default as Input} from './Forms/Input';
export {default as SearchInput} from './Forms/SearchInput';
export {default as CheckBox} from './Forms/CheckBox';
export const inputProps: TextInputProps = {
  submitBehavior: 'blurAndSubmit',
  keyboardAppearance: 'dark',
  cursorColor: COLORS.WHITE,
  selectionColor: COLORS.WHITE,
};
