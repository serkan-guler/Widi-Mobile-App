import {memo} from 'react';
import styles from './styles';
import {TextInput, TextInputProps, View} from 'react-native';
import {SearchIcon} from '../../../assets/icons';
import {scaleSize} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';

const SearchInput = (props: TextInputProps) => {
  return (
    <View style={styles.searchContainer}>
      <SearchIcon
        width={scaleSize(17)}
        height={scaleSize(17)}
        color={COLORS.WHITE}
        style={styles.searchIcon}
      />
      <TextInput
        placeholderTextColor={COLORS.WHITE}
        cursorColor={COLORS.WHITE}
        selectionColor={COLORS.WHITE}
        autoCapitalize="none"
        enterKeyHint="search"
        inputMode="search"
        keyboardAppearance="dark"
        keyboardType="default"
        submitBehavior="blurAndSubmit"
        style={styles.searchInput}
        {...props}
      />
    </View>
  );
};

export default memo(SearchInput);
