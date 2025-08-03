import {memo, useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {
  BaseButton,
  Card,
  CopyInfoCard,
  CopyTraderCard,
  Header,
  LikeButton,
  PageHeaderCard,
  PortfolioUserCard,
  ScrollLayout,
  SortButton,
  TwoColorBadge,
} from '../../../../components';
import {AppStackScreenProps, PortfolioDetailType} from '../../../../types';
import {useTranslation} from 'react-i18next';
import {InfoPrimaryIcon} from '../../../../assets/icons';
import {SCREEN_NAMES} from '../../../../constants/navigation';
import {copyDetailService} from '../../../../services';
import {showAlert} from '../../../../utils/alert';
import {formatJoinDate} from '../../../../utils';
import {useData, useWebSocket} from '../../../../hooks';

const CopyDetailScreen = ({
  route,
  navigation,
}: AppStackScreenProps<'CopyDetail'>) => {
  const {t} = useTranslation(['navigation', 'content', 'common']);
  const {sendMessage} = useWebSocket();
  const {refreshFavoriteData} = useData();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PortfolioDetailType>();

  const handleLike = useCallback(() => {
    if (data) {
      sendMessage('favorite', data?.trader);
      setData(prev =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              favoriteCount: prev.isLiked
                ? prev.favoriteCount - 1
                : prev.favoriteCount + 1,
            }
          : prev,
      );
      refreshFavoriteData();
    }
  }, [data, sendMessage]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await copyDetailService(route.params.id);

      if (response.status === 'success') {
        setData(response.data);
      } else {
        showAlert(response.status, response.message, [
          {
            text: t('common:close'),
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [route.params.id]);

  return (
    <ScrollLayout isLoading={isLoading}>
      {data && (
        <>
          <Header
            title={t('navigation:copyDetail')}
            onPressBack={() => navigation.goBack()}
          />
          <View style={styles.container}>
            <PortfolioUserCard
              showBio
              cardUser={data.traderInfo}
              leadingContent={
                <LikeButton
                  likeCount={data.favoriteCount}
                  onPress={handleLike}
                  like={data.isLiked}
                />
              }
            />
            <CopyTraderCard />
            <View style={styles.cardContainer}>
              <PageHeaderCard title={t('common:copy')} />
              <View style={styles.cardWrapper}>
                <CopyInfoCard
                  joinDays={formatJoinDate(data.openingDate)}
                  totalCopiers={data.participantCount}
                  maxCopiers={data.maxParticipants}
                />
                <Card
                  fligrant={false}
                  content={{
                    header: {
                      left: (
                        <View style={styles.cardHeaderLeftContainer}>
                          <Text style={styles.cardHeaderLeftTitle}>
                            {`${t('content:leadingMarginBalance')} (SOL)`}
                          </Text>
                          <Text style={styles.cardHeaderLeftText}>
                            1720 SOL
                          </Text>
                        </View>
                      ),
                      right: (
                        <View style={styles.cardHeaderRightContainer}>
                          <Text style={styles.cardHeaderRightTitle}>1560</Text>
                          <Text style={styles.cardHeaderLeftTitle}>
                            AUM(SOL)
                          </Text>
                        </View>
                      ),
                    },
                    items: [
                      [
                        {
                          title: '+114.54',
                          description: `${t('content:copiersPNL')} (SOL)`,
                          bracket: '-',
                          titleSuccess: true,
                        },
                        {
                          title: t('common:days', {value: 7}),
                          description: t('content:lockPeriod'),
                          bracket: '-',
                        },
                      ],
                      [
                        {
                          title: '100%',
                          description: t('content:profitSharing'),
                          bracket: '-',
                        },
                        {
                          title: '10/10',
                          description: `${t('content:minCopyAmt')} (SOL)`,
                          bracket: '-',
                        },
                      ],
                    ],
                  }}
                />
              </View>
            </View>
            <View style={styles.cardContainer}>
              <PageHeaderCard
                title={
                  <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitleText}>
                      {t('common:performance')}
                    </Text>
                    <InfoPrimaryIcon />
                  </View>
                }>
                <SortButton text={t('common:days', {value: 7})} />
              </PageHeaderCard>
              <View style={styles.cardWrapper}>
                <Card
                  fligrant={false}
                  content={{
                    header: {
                      left: (
                        <View style={styles.cardHeaderLeftContainer}>
                          <TwoColorBadge
                            title="+130.40"
                            description="Pnl (SOL)"
                            titleSuccess
                          />
                        </View>
                      ),
                      right: (
                        <View style={styles.cardHeaderRightContainer}>
                          <Text
                            style={[
                              styles.cardHeaderRightTitle,
                              styles.textSuccess,
                            ]}>
                            +65.65%
                          </Text>
                          <Text style={styles.cardHeaderLeftTitle}>ROI</Text>
                        </View>
                      ),
                    },
                    items: [
                      [
                        {
                          title: '3',
                          description: `${t('content:totalPositions')}`,
                          bracket: '-',
                        },
                        {
                          title: '66.67%',
                          description: t('content:winRate'),
                          bracket: '-',
                          flexEnd: true,
                        },
                      ],
                      [
                        {
                          title: '2',
                          description: t('content:profitablePositions'),
                          bracket: '-',
                        },
                      ],
                    ],
                  }}
                />
              </View>
            </View>
            <BaseButton
              label={t('common:copy')}
              onPress={() =>
                navigation.navigate(
                  data.type === 'private'
                    ? SCREEN_NAMES.APP.PRIVATE_CODE
                    : SCREEN_NAMES.APP.COPY_AMOUNT,
                  {
                    id: data._id,
                    favoriteCount: data.favoriteCount,
                    isLiked: data.isLiked,
                    trader: data.traderInfo,
                    openingDate: data.openingDate,
                    totalCopiers: data.participantCount,
                    maxParticipants: data.maxParticipants,
                    minCopyAmount: data.minInvestment,
                    profitShare: data.profitShare,
                    lockPeriod: data.lockPeriod,
                  },
                )
              }
            />
          </View>
        </>
      )}
    </ScrollLayout>
  );
};

export default memo(CopyDetailScreen);
