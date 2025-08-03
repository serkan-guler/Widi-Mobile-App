import {memo, ReactNode, useMemo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {CardItemsType} from '../../cards';

const TwoColor = ({
  leading,
  title,
  description,
  bracket = '-',
  titleSuccess,
  titleDanger,
  titleSolid,
  descriptionSuccess,
  descriptionDanger,
  descriptionWhite,
  flexEnd = false,
}: CardItemsType) => {
  const handleTitleStyle = useMemo(() => {
    if (titleSuccess || titleDanger || titleSolid) {
      if (titleSolid) {
        return styles.descriptionBase;
      }
      if (titleSuccess) {
        return styles.titleSuccess;
      }
      if (titleDanger) {
        return styles.titleDanger;
      }
    }
    return styles.titleBase;
  }, [titleSuccess, titleDanger, titleSolid]);

  const handleDescriptionStyle = useMemo(() => {
    if (descriptionSuccess || descriptionDanger || descriptionWhite) {
      if (descriptionWhite) {
        return styles.titleBase;
      }
      if (descriptionSuccess) {
        return styles.descriptionSuccess;
      }
      if (descriptionDanger) {
        return styles.descriptionDanger;
      }
    }
    return styles.descriptionBase;
  }, [descriptionSuccess, descriptionDanger, descriptionWhite]);

  return (
    <View style={[styles.twoColorWrapper, flexEnd && styles.flexEnd]}>
      {leading}
      <Text
        style={[styles.twoColorText, handleTitleStyle]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {title}
        <Text
          style={[
            styles.twoColorWrapper,
            handleDescriptionStyle,
          ]}>{` ${bracket} `}</Text>
        <Text
          style={[styles.twoColorWrapper, handleDescriptionStyle]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {description}
        </Text>
      </Text>
    </View>
  );
};

export default memo(TwoColor);
