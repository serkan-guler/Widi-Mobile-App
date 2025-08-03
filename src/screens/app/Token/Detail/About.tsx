import {memo, useCallback, useMemo} from 'react';
import styles from './styles';
import {PageHeaderCard} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {TokenRiskDataType, TokenRiskFactorWidthValue} from '../../../../types';
import {tokenRiskData} from '../../../../lib/data';
import {showAlert} from '../../../../utils/alert';

type Props = {
  data: TokenRiskFactorWidthValue[];
  lpBurn: number;
};

const About = ({data, lpBurn}: Props) => {
  const {t} = useTranslation(['content', 'common']);

  const dataNameArray = useMemo(
    () => data.map(item => item.name.toLowerCase()),
    [data],
  );

  const tokenData = useMemo(() => {
    const latestData: TokenRiskDataType[] = [];

    tokenRiskData.map(item => {
      if (dataNameArray.includes(item.nameData.toLowerCase())) {
        latestData.push({
          ...item,
          value: data.find(
            d => d.name.toLowerCase() === item.nameData.toLowerCase(),
          )?.value,
        });
      }
    });

    tokenRiskData.map(item => {
      if (!dataNameArray.includes(item.nameData.toLowerCase())) {
        latestData.push({
          ...item,
        });
      }
    });

    latestData.map(item => {
      if (item.name === 'lpBurned') {
        if (lpBurn < 100) {
          item.value = `${lpBurn}%`;
        } else {
          item.value = 'burnt';
        }
      }

      if (
        dataNameArray.includes(item.nameData.toLowerCase()) &&
        item.name === 'mintAuthorityEnabled'
      ) {
      }

      if (item.name === 'mintAuthorityEnabled') {
        if (dataNameArray.includes(item.nameData.toLowerCase())) {
          item.value = 'mintable';
        } else {
          item.value = 'noMint';
        }
      }

      return item;
    });

    return latestData;
  }, [data, dataNameArray, tokenRiskData, lpBurn]);

  const handlePress = useCallback(
    (index: number) => {
      const item = tokenData[index];
      let options = {};
      if (item.name === 'top10Holders') {
        if (item.value) {
          options = {
            value: item.value,
          };
        } else {
          options = {
            value: '0%',
          };
        }
      }
      showAlert(
        t(`content:solanaTracker.${item.name}`, options),
        t(`content:solanaTracker.${item.description}`, options),
      );
    },
    [tokenData, t],
  );

  return (
    <View style={[styles.paddingHorizontal, styles.auditWrapper]}>
      <View style={styles.auditTitle}>
        <PageHeaderCard title={t('content:degenAudit')} />
      </View>
      {tokenData.map((item, index) => {
        const havePercentage = item.value && item.value.includes('%');
        const percentageTexts =
          item.value && item.value.includes('%') ? item.value.split('%') : [];

        const textStyle: TextStyle[] = [styles.badgeAuditText];
        const containerStyle: ViewStyle[] = [styles.badgeContainer];

        if (item.name === 'lpBurned') {
          if (item.value?.includes('%')) {
            textStyle.push(styles.badgeAuditTextDanger);
            containerStyle.push(styles.badgeDangerContainer);
          } else {
            textStyle.push(styles.badgeAuditTextSuccess);
            containerStyle.push(styles.badgeSuccessContainer);
          }
        } else if (item.name === 'mintAuthorityEnabled') {
          if (item.value === 'mintable') {
            textStyle.push(styles.badgeAuditTextDanger);
            containerStyle.push(styles.badgeDangerContainer);
          } else {
            textStyle.push(styles.badgeAuditTextSuccess);
            containerStyle.push(styles.badgeSuccessContainer);
          }
        } else if (item.name === 'top10Holders' && percentageTexts.length > 1) {
          const numberValue = parseFloat(percentageTexts[0]);
          if (!isNaN(numberValue) && numberValue > 30) {
            textStyle.push(styles.badgeAuditTextDanger);
            containerStyle.push(styles.badgeDangerContainer);
          } else {
            textStyle.push(styles.badgeAuditTextSuccess);
            containerStyle.push(styles.badgeSuccessContainer);
          }
        } else {
          containerStyle.push(styles.badgeSuccessContainer);
          textStyle.push(styles.badgeAuditTextSuccess);
        }

        let text = '';
        if (percentageTexts.length > 0) {
          text = percentageTexts[0];
        } else if (item.value === 'burnt') {
          text = `${t('content:solanaTracker.burnt')} 🔥`;
        } else if (item.value === 'mintable' || item.value === 'noMint') {
          text = t(`content:solanaTracker.${item.value}`);
        } else {
          if (dataNameArray.includes(item.nameData.toLowerCase())) {
            text = t('common:failed');
          } else {
            text = t('common:passed');
          }
        }

        return (
          <TouchableOpacity
            style={[styles.auditContainer]}
            key={index}
            onPress={() => handlePress(index)}>
            <Text style={styles.auditText}>
              {t(`content:solanaTracker.${item.name}`)}
            </Text>
            <View style={containerStyle}>
              <Text style={[styles.fontMedium, ...textStyle]}>
                {text}
                {havePercentage && (
                  <>
                    {' '}
                    <Text style={[styles.fontNeue, ...textStyle]}>%</Text>
                  </>
                )}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(About);
