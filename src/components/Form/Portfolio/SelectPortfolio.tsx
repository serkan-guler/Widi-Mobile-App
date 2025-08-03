import {memo} from 'react';
import styles from './styles';

import {TouchableOpacity, Text, View} from 'react-native';
import {PortfolioType} from '../../../types';
import {useTranslation} from 'react-i18next';

type Props = {
  type: PortfolioType;
  isSelected: boolean;
  onPress: () => void;
};

const SelectPortfolio = ({type, isSelected, onPress}: Props) => {
  const {t} = useTranslation(['common', 'content']);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.selectContainer,
        isSelected
          ? styles.selectContainerSelected
          : styles.selectContainerBase,
      ]}>
      <View style={styles.selectWrapper}>
        <View
          style={[
            styles.selectRectangle,
            isSelected
              ? styles.selectRectangleSelected
              : styles.selectRectangleBase,
          ]}>
          {isSelected && <View style={styles.selection} />}
        </View>
        <Text
          style={[
            styles.titleText,
            isSelected ? styles.selectedTextColor : styles.defaultTextColor,
          ]}>
          {t(`common:${type}`)}
        </Text>
      </View>
      <Text
        style={[
          styles.descriptionText,
          isSelected ? styles.selectedTextColor : styles.defaultTextColor,
        ]}>
        {/* {t(`content:portfolioType.${type}`)} */}
        {t(`content:${type}PortfolioDetail`)}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(SelectPortfolio);
