import {memo} from 'react';
import styles from './styles';
import Card from '../Base';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Portfolio} from '../../../types';
import {LockPortfolioIcon, UnlockPortfolioIcon} from '../../../assets/icons';
import {COLORS} from '../../../constants/colors';
import {scaleSize} from '../../../constants/dimensions';

type Props = {
  data: Portfolio;
};

const HeaderLeft = () => {
  const {t} = useTranslation('content');

  return (
    <View style={styles.headerLeft}>
      <Text style={styles.solidText}>{t('leadingBalance')} (SOL)</Text>
      <Text style={styles.textWhite}>32 SOL</Text>
    </View>
  );
};

const HeaderRight = () => {
  return (
    <View style={styles.headerRight}>
      <Text style={styles.rightTitle}>1214.50</Text>
      <Text style={styles.solidText}>AUM(SOL)</Text>
    </View>
  );
};

const PortfolioCard = ({data}: Props) => {
  const {t} = useTranslation(['content', 'common']);

  const iconProps = {
    width: scaleSize(15),
    height: scaleSize(18),
    color: COLORS.PRIMARY,
  };

  return (
    <Card
      fligrant={false}
      headers={[
        {
          left: (
            <View style={styles.topHeader}>
              <Text style={styles.topHeaderText}>{data.name}</Text>
              {data.type === 'private' ? (
                <LockPortfolioIcon {...iconProps} />
              ) : (
                <UnlockPortfolioIcon {...iconProps} />
              )}
            </View>
          ),
        },
      ]}
      content={{
        header: {
          left: <HeaderLeft />,
          right: <HeaderRight />,
        },
        items: [
          [
            {
              title: '+219.54',
              description: `${t('content:copiersPNL')} (SOL)`,
              titleSuccess: true,
            },
            {
              title: `${t('common:days', {value: data.lockPeriod})}`,
              description: `${t('content:lockPeriod')}`,
            },
          ],
          [
            {
              title: `${data.profitShare.toFixed(2)}%`,
              description: `${t('content:profitSharing')}`,
            },
            {
              title: data.minInvestment.toFixed(2),
              description: `${t('content:minCopyAmt')} (SOL)`,
            },
          ],
          [
            {
              title: '1.24',
              description: `${t('content:unrealizedProfitShare')}`,
            },
            {
              title: `${data.participantCount}/${data.maxParticipants}`,
              description: `${t('content:copiers')}`,
            },
          ],
        ],
      }}
    />
  );
};

export default memo(PortfolioCard);
