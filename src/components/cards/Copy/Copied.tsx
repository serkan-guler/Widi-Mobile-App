import {memo} from 'react';
import styles from './styles';
import Card, {CardItemsType} from '../Base';
import {Text, View} from 'react-native';
import {exampleTokens} from '../../../lib/exampleData';
import {Img, TwoColorBadge} from '../../common';
import {XConnectIcon} from '../../../assets/icons';
import {useTranslation} from 'react-i18next';

type Props = {
  type?: 'realized' | 'unrealized';
};

const CopiedCard = ({type = 'unrealized'}: Props) => {
  const {t} = useTranslation(['content', 'common']);

  const items: CardItemsType[] = [
    {
      title: '4,298.492',
      description: `${t('content:size')} (SOL)`,
    },
  ];

  if (type === 'unrealized') {
    items.push({
      title: t('common:days', {value: 7}),
      description: t('content:lockPeriod'),
    });
  }

  return exampleTokens.map((token, index) => (
    <Card
      key={index}
      fligrant={type === 'realized'}
      headers={[
        {
          left: (
            <View style={styles.copiedLeftContainer}>
              <Img
                source={token.token.image}
                style={styles.copiedLeftImage}
                resizeMode="cover"
              />
              <Text style={styles.copiedLeftText}>{token.token.symbol}</Text>
              <XConnectIcon />
            </View>
          ),
        },
      ]}
      content={{
        header: {
          left: (
            <TwoColorBadge
              title="16,22"
              description={`${t('content:realizedPNL')} (SOL)`}
              titleSuccess
            />
          ),
          right: (
            <View style={styles.copiedContentRightContainer}>
              <Text style={[styles.copiedContentRightTitle, styles.fontMedium]}>
                +45.95
                <Text style={[styles.fontNeue, styles.copiedContentRightTitle]}>
                  %
                </Text>
              </Text>
              <Text style={styles.copiedContentRightDesc}>ROI</Text>
            </View>
          ),
        },
        items: [items],
      }}
    />
  ));
};

export default memo(CopiedCard);
