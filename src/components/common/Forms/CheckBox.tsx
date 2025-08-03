import {memo, PropsWithChildren, useMemo} from 'react';
import styles from './styles';
import {TouchableOpacity, View, Text} from 'react-native';
import {CheckIcon} from '../../../assets/icons';
import {COLORS} from '../../../constants/colors';
import {scaleSize} from '../../../constants/dimensions';

type Props = {
  fullClick?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
};

const Button = ({fullClick = false, isSelected, onPress}: Props) => {
  const checkComponent = useMemo(
    () => (
      <CheckIcon
        color={COLORS.PRIMARY}
        width={scaleSize(10)}
        height={scaleSize(10)}
      />
    ),
    [],
  );
  if (fullClick) {
    return (
      <View
        style={[
          styles.checkbox,
          isSelected ? styles.checkboxSelected : styles.checkboxUnselected,
        ]}>
        {isSelected && checkComponent}
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        isSelected ? styles.checkboxSelected : styles.checkboxUnselected,
      ]}
      onPress={onPress}>
      {isSelected && checkComponent}
    </TouchableOpacity>
  );
};

const Content = ({
  fullClick = false,
  isSelected,
  onPress,
  children,
}: PropsWithChildren<Props>) => {
  const child =
    children && typeof children === 'string' ? (
      <Text style={styles.checkBoxText}>{children}</Text>
    ) : (
      children
    );

  return (
    <>
      <Button fullClick={fullClick} isSelected={isSelected} onPress={onPress} />
      {child}
    </>
  );
};

const CheckBox = ({
  fullClick = false,
  isSelected,
  onPress,
  children,
}: PropsWithChildren<Props>) => {
  const content = useMemo(
    () => (
      <Content fullClick={fullClick} isSelected={isSelected} onPress={onPress}>
        {children}
      </Content>
    ),
    [fullClick, isSelected, onPress, children],
  );

  if (fullClick) {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.checkboxContainer}>{content}</View>;
};

export default memo(CheckBox);
