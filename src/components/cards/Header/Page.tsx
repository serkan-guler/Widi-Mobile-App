import {memo, PropsWithChildren, ReactNode} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {scaleFont} from '../../../constants/dimensions';

type Props = {
  title: string | ReactNode;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
};

const PageHeader = ({
  title,
  fontSize,
  lineHeight,
  letterSpacing,
  children,
}: PropsWithChildren<Props>) => {
  const size = scaleFont(fontSize || 25);
  const height = scaleFont(lineHeight || 33);
  const spacing = scaleFont(letterSpacing || -0.5);

  const TitleComponent = () => {
    if (typeof title === 'string') {
      return (
        <Text
          style={[
            styles.title,
            {fontSize: size, lineHeight: height, letterSpacing: spacing},
          ]}>
          {title}
        </Text>
      );
    }

    return title;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <View style={styles.titleContainer}>
        <TitleComponent />
      </View>
      {children}
    </View>
  );
};

export default memo(PageHeader);
