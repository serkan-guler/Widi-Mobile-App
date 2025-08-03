import {memo} from 'react';
import styles from './styles';
import Card from '../Base';
import {Text, View} from 'react-native';
import {TokenDetailResponse} from '../../../types';
import {Img, StatusBadge} from '../../common';

const WalletTokensCard = (token: TokenDetailResponse) => {
  return (
    <Card
      fligrant={false}
      headers={[
        {
          left: (
            <View style={styles.titleContainer}>
              <Img
                source={token.token.image}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleName}>{token.token.symbol}</Text>
                <Text
                  style={
                    styles.titleMC
                  }>{`MC: $${token.pools[0].marketCap.usd.toFixed(2)}`}</Text>
              </View>
            </View>
          ),
        },
      ]}
      content={{
        header: {
          left: (
            <View style={styles.contentWrapper}>
              <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>Balance</Text>
                <Text style={styles.contentText}>$2.421,22</Text>
                <Text style={styles.contentDescription}>12,21</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[styles.contentTitle, styles.contentTextCenter]}>
                  My Profit share
                </Text>
                <Text style={[styles.contentText, styles.contentTextCenter]}>
                  $3.30
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[styles.contentTitle, styles.contentTextRight]}>
                  Current P&L
                </Text>
                <Text style={[styles.contentText, styles.contentTextRight]}>
                  $3.30
                </Text>
                <View style={{marginLeft: 'auto'}}>
                  <StatusBadge
                    type="danger"
                    label="-12.43%"
                    containerStyle={styles.badgeContainer}
                  />
                </View>
              </View>
            </View>
          ),
        },
      }}
    />
  );
};

export default memo(WalletTokensCard);
