import {memo, PropsWithChildren, ReactNode} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Logo} from '../../../assets/logos';
import {scaleSize} from '../../../constants/dimensions';
import {COLORS} from '../../../constants/colors';

type Props = {
  content: ReactNode;
};

const BrandCard = ({content, children}: PropsWithChildren<Props>) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo
          width={scaleSize(33)}
          height={scaleSize(28)}
          color={COLORS.DARK}
        />
      </View>
      <View style={styles.content}>
        {content}
        {children}
      </View>
    </View>
  );
};

export default memo(BrandCard);
