import {memo, useMemo} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Img} from '../../common';

type Props = {
  market?: string;
};

const MarketImage = ({market}: Props) => {
  const marketName = useMemo(() => market?.toLowerCase(), [market]);

  const source = useMemo(() => {
    if (marketName?.includes('pumpfun') || marketName?.includes('pump.fun')) {
      return 'capsule';
    }
    if (marketName?.includes('raydium')) {
      return 'raydium';
    }
    if (marketName?.includes('orca')) {
      return 'orca';
    }
    if (marketName?.includes('meteora')) {
      return 'meteora';
    }
    if (marketName?.includes('moonshot')) {
      return 'moonshot';
    }
  }, [marketName]);

  if (!marketName || !source) {
    return null;
  }

  return (
    <View style={[styles.marketContainer]}>
      <Img source={source} style={styles.marketImage} />
    </View>
  );
};

export default memo(MarketImage);
