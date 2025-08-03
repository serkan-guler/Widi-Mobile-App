import {memo, PropsWithChildren, ReactNode} from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {TwoColorBadge} from '../../common';
import {Logo} from '../../../assets/logos';
import {scaleSize} from '../../../constants/dimensions';

type LeftRightProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export type CardItemsType = {
  title: string;
  description: string;
  bracket?: string;
  leading?: ReactNode;
  titleSuccess?: boolean;
  titleDanger?: boolean;
  titleSolid?: boolean;
  descriptionSuccess?: boolean;
  descriptionDanger?: boolean;
  descriptionWhite?: boolean;
  flexEnd?: boolean;
};

type ContentProps = {
  header?: LeftRightProps;
  items?: CardItemsType[][];
};

type Props = {
  headers?: LeftRightProps[];
  content?: ContentProps;
  fligrant?: boolean;
  onCardPress?: () => void;
  onHeaderLeftPress?: () => void;
  onContentPress?: () => void;
};

type ContainerProps = {type: 'card' | 'headerLeft' | 'content'};

const Card = ({
  headers,
  content,
  fligrant = true,
  onCardPress,
  onHeaderLeftPress,
  onContentPress,
  children,
}: PropsWithChildren<Props>) => {
  const {header, items} = content || {};

  const Container = ({type, children}: PropsWithChildren<ContainerProps>) => {
    switch (type) {
      case 'card':
        if (onCardPress) {
          return (
            <TouchableOpacity style={styles.container} onPress={onCardPress}>
              {children}
            </TouchableOpacity>
          );
        }
        return <View style={styles.container}>{children}</View>;
      case 'headerLeft':
        if (onHeaderLeftPress) {
          return (
            <TouchableOpacity onPress={onHeaderLeftPress}>
              {children}
            </TouchableOpacity>
          );
        }
        return <View>{children}</View>;
      case 'content':
        if (onContentPress) {
          return (
            <TouchableOpacity
              style={styles.contentContainer}
              onPress={onContentPress}>
              {children}
            </TouchableOpacity>
          );
        }
        return <View style={styles.contentContainer}>{children}</View>;
      default:
        return null;
    }
  };

  return (
    <Container type="card">
      {headers && headers.length > 0 && (
        <View style={styles.headerContainer}>
          {headers.map((header, index) => (
            <View key={index} style={styles.headerRow}>
              <Container type="headerLeft">{header.left}</Container>
              <View>{header.right}</View>
            </View>
          ))}
        </View>
      )}
      {(header || items) && (
        <Container type="content">
          {fligrant && (
            <View style={styles.fligrant}>
              <Logo
                width={scaleSize(28)}
                height={scaleSize(23)}
                color={'#505050'}
              />
            </View>
          )}
          {header && (
            <View style={styles.contentHeaderContainer}>
              {header.left}
              {header.right}
            </View>
          )}
          {items && items.length > 0 && (
            <View style={styles.contentRowsContainer}>
              {items.map((rows, rowIndex) => (
                <View key={rowIndex} style={styles.contentRow}>
                  {rows.map((item, index) => (
                    <TwoColorBadge key={index} {...item} />
                  ))}
                </View>
              ))}
            </View>
          )}
          {children}
        </Container>
      )}
    </Container>
  );
};

export default memo(Card);
