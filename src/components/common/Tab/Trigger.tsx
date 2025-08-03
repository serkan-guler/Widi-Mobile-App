import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import {ScrollView, View, ViewProps} from 'react-native';
import styles from './styles';
import Button from './Button';
import {useTabContext} from './context';

type Props = {
  children: ReactNode;
} & ViewProps;

const Trigger = ({children, ...props}: Props) => {
  const {activeTab, handleSetActiveTab, scrollAnimation, type} =
    useTabContext();

  // Children'ları array'e dönüştürüp filtreleme
  const validChildren = Children.toArray(children).filter(
    (child): child is ReactElement<any> =>
      isValidElement(child) && child.type === Button,
  );

  const body = validChildren.map((child, index) => {
    return cloneElement(child, {
      ...child.props,
      onPress: () => {
        if (activeTab !== index) {
          if (child.props.onPress) {
            child.props.onPress();
          }
          // Tab değişimini tetikle
          handleSetActiveTab(index);
        }
      },
      key: `tab-trigger-${index}`,
      isActive: index === activeTab,
      buttonIndex: index,
    });
  });

  if (type === 'default') {
    return (
      <ScrollView
        style={[styles.trigger, styles.triggerContainer]}
        horizontal
        // centerContent
        overScrollMode={scrollAnimation ? 'auto' : 'never'}
        showsHorizontalScrollIndicator={false}
        bounces={scrollAnimation}
        {...props}>
        {body}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.trigger, styles.triggerContainerStatus]} {...props}>
      {body}
    </View>
  );
};

export default Trigger;
