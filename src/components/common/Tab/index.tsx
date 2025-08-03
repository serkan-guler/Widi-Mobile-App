import {
  isValidElement,
  JSX,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import {Animated, Dimensions, View, ViewProps} from 'react-native';
import styles from './styles';
import Trigger from './Trigger';
import Button from './Button';
import Content from './Content';
import FlatContent from './FlatContent';
import {TabContext} from './context';
import {PageLoading} from '../../loading';

export type TabProps = {
  labels?: string[];
  activeIndex?: number;
  onTabPress?: (index: number) => void;
  children: JSX.Element[];
  divider?: ReactNode;
  scrollAnimation?: boolean;
  isLoading?: boolean;
  type?: 'default' | 'status';
} & ViewProps;

const {width} = Dimensions.get('window');

const Tabs = ({
  labels,
  children,
  activeIndex,
  onTabPress,
  divider,
  scrollAnimation = false,
  isLoading = false,
  type = 'default',
  ...props
}: TabProps) => {
  const [activeTab, setActiveTab] = useState(activeIndex || 0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSetActiveTab = useCallback(
    (index: number) => {
      const direction = index > activeTab ? 1 : -1;
      slideAnim.setValue(direction * width);

      setActiveTab(index);

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 70,
        friction: 10,
        useNativeDriver: true,
      }).start();

      if (onTabPress) {
        onTabPress(index);
      }
    },
    [activeTab, onTabPress, slideAnim],
  );

  const triggers = children.filter(
    c => isValidElement(c) && c.type === Trigger,
  );
  const contents = children.filter(
    c => isValidElement(c) && (c.type === Content || c.type === FlatContent),
  );

  const activeContent = contents[activeTab];

  return (
    <TabContext.Provider
      value={{
        activeTab,
        handleSetActiveTab,
        scrollAnimation,
        type,
      }}>
      <View style={styles.container} {...props}>
        {triggers && triggers.length > 0 ? (
          triggers
        ) : labels && labels.length > 0 ? (
          <Trigger>
            {labels.map((label, index) => (
              <Button label={label} key={index} />
            ))}
          </Trigger>
        ) : null}
        {divider}
        <Animated.View
          style={[
            activeContent.props.style,
            {flex: 1, transform: [{translateX: slideAnim}]},
          ]}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <PageLoading />
            </View>
          ) : (
            activeContent
          )}
        </Animated.View>
      </View>
    </TabContext.Provider>
  );
};

Tabs.displayName = 'Tab';
Tabs.List = Trigger;
Tabs.Trigger = Button;
Tabs.Content = Content;
Tabs.FlatContent = FlatContent;

export default Tabs;
