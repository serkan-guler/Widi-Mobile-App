import {memo} from 'react';
import styles from './styles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Button from './Button';
import {MainTabParamList} from '../../../../types';
import {SPACING} from '../../../../constants/dimensions';
import {useApp} from '../../../../hooks';
// import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const BottomTabBar = ({state, navigation, insets}: BottomTabBarProps) => {
  const {setBottomTabBarHeight} = useApp();
  // const activeRoute = state.routes[state.index];

  // Aktif tab içindeki focused route'u al (nested navigation için)
  // const focusedRouteName = getFocusedRouteNameFromRoute(activeRoute);

  const padding = SPACING.SM > 18 ? 18 : SPACING.SM;

  return (
    <View
      style={[styles.container, {padding, paddingBottom: insets.bottom}]}
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setBottomTabBarHeight(height);
      }}>
      {state.routes.map((route, index) => (
        <Button
          type={route.name as keyof MainTabParamList}
          navigation={navigation}
          key={index}
          isActive={state.index === index}
        />
      ))}
    </View>
  );
};

export default memo(BottomTabBar);
