import {Dispatch, memo, SetStateAction} from 'react';
import styles from './styles';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppStackScreenProps} from '../../../../types';
import {Header} from '../../../../components';
import {SearchIcon} from '../../../../assets/icons';
import {scaleSize} from '../../../../constants/dimensions';
import {COLORS} from '../../../../constants/colors';

type Props = AppStackScreenProps<'TokenSearch'> & {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  handlePaste: () => Promise<void>;
  handleDone: () => void;
};

const ListHeaderComponent = ({
  navigation,
  searchText,
  setSearchText,
  handlePaste,
  handleDone,
}: Props) => {
  const {t} = useTranslation(['navigation', 'common', 'content']);

  return (
    <View>
      <Header
        title={t('common:search')}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.inputContainer}>
        <SearchIcon
          width={scaleSize(17)}
          height={scaleSize(17)}
          color={COLORS.WHITE}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder={t('common:searchToken')}
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          returnKeyType="search"
          onSubmitEditing={handleDone}
          autoCorrect={false}
          cursorColor={COLORS.WHITE}
          selectionColor={COLORS.WHITE}
          placeholderTextColor={COLORS.GRAY}
          keyboardAppearance="dark"
          submitBehavior="blurAndSubmit"
          enterKeyHint="search"
        />
      </View>
      <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
        <Text style={styles.pasteButtonText}>
          {t('common:pasteFromClipboard')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ListHeaderComponent);
