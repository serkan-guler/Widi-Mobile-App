import {memo, useMemo} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Card, Img, TwoColorBadge} from '../../../../components';
import {
  LockIcon,
  SolanaBridgeIcon,
  UnlockPortfolioIcon,
  XConnectIcon,
} from '../../../../assets/icons';
import {useTranslation} from 'react-i18next';
import {toLocaleUpperCase} from '../../../../utils';
import {scaleSize} from '../../../../constants/dimensions';
import {PortfolioWithIsParticipant} from '../../../../types';
import {COLORS} from '../../../../constants/colors';

type Props = {
  onPress: (id: string) => void | undefined;
  portfolio: PortfolioWithIsParticipant;
};

const LeaderCard = ({onPress, portfolio}: Props) => {
  const {t} = useTranslation(['common', 'content']);
  const day = toLocaleUpperCase(t('common:d', {value: portfolio.lockPeriod}));

  const iconProps = {
    width: scaleSize(24),
    height: scaleSize(24),
    color: COLORS.PRIMARY,
  };

  const disabled = useMemo(
    () => !portfolio.isActive || portfolio.isParticipant,
    [portfolio],
  );

  return (
    <Card
      headers={[
        {
          left: (
            <View style={styles.cardTitle}>
              <Img
                source={portfolio.traderInfo.profilePicture}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.cardTitleText}>
                {portfolio.traderInfo.username}
              </Text>
              <View style={styles.connectIcon}>
                <XConnectIcon width={scaleSize(24)} height={scaleSize(24)} />
              </View>
              {portfolio.type === 'private' ? (
                <LockIcon {...iconProps} />
              ) : (
                <UnlockPortfolioIcon {...iconProps} />
              )}
            </View>
          ),
          right: (
            <TouchableOpacity
              style={[
                styles.copyButton,
                disabled ? styles.copyButtonDisabled : styles.copyButtonBase,
              ]}
              disabled={!portfolio.isActive}
              onPress={() => onPress(portfolio._id)}>
              <Text
                style={[
                  styles.copyText,
                  disabled ? styles.copyTextDisabled : styles.copyTextBase,
                ]}>
                {t(
                  !portfolio.isActive
                    ? 'common:closed'
                    : portfolio.isParticipant
                      ? 'navigation:copied'
                      : 'common:copy',
                )}
              </Text>
            </TouchableOpacity>
          ),
        },
      ]}
      content={{
        header: {
          left: (
            <TwoColorBadge
              title={portfolio.participantCount.toString()}
              description={portfolio.maxParticipants.toString()}
              bracket="/"
            />
          ),
          right: (
            <View style={styles.trendCardContentHeaderContainer}>
              <Text
                style={[
                  styles.trendCardContentHeaderTitle,
                  styles.trendCardContentHeaderTitleBase,
                ]}>
                ${'0.00'}
              </Text>
              {/* <Text
                style={[
                  styles.trendCardContentHeaderTitle,
                  historic.totalPnl > 0
                    ? styles.trendCardContentHeaderTitleSuccess
                    : historic.totalPnl < 0
                      ? styles.trendCardContentHeaderTitleDanger
                      : styles.trendCardContentHeaderTitleBase,
                ]}>
                ${historic.totalPnl ? historic.totalPnl.toFixed(2) : '0.00'}
              </Text> */}
              <Text style={styles.trendCardContentHeaderDescription}>
                {`${day} PNL`}
              </Text>
            </View>
          ),
        },
        items: [
          [
            {
              title: t('common:days', {value: portfolio.lockPeriod}),
              description: t('content:lockPeriod'),
              bracket: '-',
            },
            {
              title: `${portfolio.minInvestment} SOL`,
              description: t('content:minCopyAmt'),
              bracket: '-',
              leading: (
                <SolanaBridgeIcon
                  width={scaleSize(11.8)}
                  height={scaleSize(10.6)}
                />
              ),
            },
          ],
          [
            // {
            //   title: `${historic.percentageChange}%`,
            //   description: `${day} ROI`,
            //   bracket: '-',
            //   titleSuccess: historic.percentageChange > 0,
            //   titleDanger: historic.percentageChange < 0,
            // },
            {
              title: `0%`,
              description: `${day} ROI`,
              bracket: '-',
              titleSuccess: false,
              titleDanger: true,
            },
            {
              title: `${portfolio.totalInvestment.toFixed(2)} SOL`,
              description: 'AUM',
              bracket: '-',
            },
          ],
        ],
      }}
    />
  );
};

export default memo(LeaderCard);
