import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import styles from './styles';
import {useTabContext} from './context';

type Props = {
  label: string;
  isActive?: boolean;
  buttonIndex?: number;
} & TouchableOpacityProps;

const Button = ({label, isActive, buttonIndex, ...props}: Props) => {
  const {type} = useTabContext();

  const {style, ...rest} = props;

  const buttonStyle: TouchableOpacityProps['style'] = [],
    textComponentStyle: TextStyle[] = [];

  // if (style) {
  //   buttonStyle.push(style);
  // } else {
  //   buttonStyle.push(styles.button);
  // }

  // if (textStyle) {
  //   textComponentStyle.push(textStyle);
  // } else {
  //   textComponentStyle.push(styles.text);
  // }

  if (type === 'default') {
    buttonStyle.push(styles.button);
    textComponentStyle.push(styles.text);

    if (buttonIndex && buttonIndex !== 0) {
      buttonStyle.push(styles.margin);
    }

    if (isActive) {
      buttonStyle.push(styles.activeTabButton);
      // textComponentStyle.push(styles.activeTabText);
    }
  } else {
    buttonStyle.push(styles.buttonStatus);
    textComponentStyle.push(styles.textStatus);

    if (isActive) {
      buttonStyle.push(styles.activeTabButtonStatus);
    }
  }

  if (isActive) {
    textComponentStyle.push(styles.activeTabText);
  }

  return (
    <TouchableOpacity style={buttonStyle} {...rest}>
      <Text style={textComponentStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
