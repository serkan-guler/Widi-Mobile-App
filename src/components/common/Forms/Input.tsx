import {JSX, memo} from 'react';
import styles from './styles';
import {TextInput, TextInputProps} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {Control, Controller, FieldPath, FieldValues} from 'react-hook-form';

type BaseProps = {
  inputColor?: 'success' | 'default';
};

type WithoutFormProps = BaseProps &
  TextInputProps & {
    name?: never;
    control?: never;
  };

type WithFormProps<TFieldValues extends FieldValues = FieldValues> = BaseProps &
  Omit<TextInputProps, 'value' | 'onChangeText'> & {
    name: FieldPath<TFieldValues>;
    control: Control<TFieldValues, any>;
  };

type Props<TFieldValues extends FieldValues = FieldValues> =
  | WithoutFormProps
  | WithFormProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => {
  const {style, name, control, ...rest} = props;

  // React Hook Form ile kullanım
  if (name && control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholderTextColor={COLORS.SECONDARY}
            cursorColor={COLORS.WHITE}
            selectionColor={COLORS.WHITE}
            style={[styles.container, style]}
            submitBehavior="blurAndSubmit"
            keyboardAppearance="dark"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...rest}
          />
        )}
      />
    );
  }

  // Normal kullanım (React Hook Form olmadan)
  return (
    <TextInput
      placeholderTextColor={COLORS.SECONDARY}
      cursorColor={COLORS.WHITE}
      selectionColor={COLORS.WHITE}
      style={[styles.container, style]}
      submitBehavior="blurAndSubmit"
      keyboardAppearance="dark"
      {...rest}
    />
  );
};

export default memo(Input) as <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => JSX.Element;
