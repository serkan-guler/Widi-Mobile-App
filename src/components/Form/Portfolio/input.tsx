import {memo, ReactNode} from 'react';
import styles from './styles';
import {TextInput, TextInputProps, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {Control, Controller, FieldPath} from 'react-hook-form';
import {AddPortfolioType} from '../../../types';
import {Notification} from '../../common';

type Props = {
  name: FieldPath<AddPortfolioType>;
  control: Control<AddPortfolioType>;
  trailing?: ReactNode;
  trailingIsText?: boolean;
} & TextInputProps;

const PortfolioInput = ({
  trailing,
  name,
  control,
  trailingIsText = true,
  ...props
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {ref, onChange, onBlur, value},
        fieldState: {error},
        formState: {isSubmitting, isSubmitSuccessful, isSubmitted},
      }) => (
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={ref}
              placeholderTextColor={COLORS.WHITE}
              submitBehavior="blurAndSubmit"
              keyboardAppearance="dark"
              cursorColor={COLORS.WHITE}
              selectionColor={COLORS.WHITE}
              style={styles.input}
              keyboardType="numeric"
              autoCapitalize="none"
              value={value as string | undefined}
              onChangeText={onChange}
              onBlur={onBlur}
              // returnKeyType="next"
              // readOnly={isSubmitting || isSubmitted}
              {...props}
              // onSubmitEditing={() => setFocus(name as FieldPath<FieldValues>)}
            />
            {trailing && (
              <View
                style={[
                  styles.trailingContainer,
                  trailingIsText && styles.iconEventNone,
                ]}>
                {trailing}
              </View>
            )}
          </View>
          {error && error.message && (
            <View style={styles.errorWrapper}>
              <Notification message={error.message} type="error" />
            </View>
          )}
        </View>
      )}
    />
  );
};

export default memo(PortfolioInput);
