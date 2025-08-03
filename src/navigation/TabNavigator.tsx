import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../types';
import {NAVIGATION_CONFIG, SCREEN_NAMES} from '../constants/navigation';
import {BottomTabs} from '../components';
import {
  CopiedScreen,
  LeaderScreen,
  ProfileScreen,
  TokenScreen,
  WalletScreen,
  PortfolioScreen,
} from '../screens/app';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function AppNavigator() {
  const customTab = (props: BottomTabBarProps) => <BottomTabs {...props} />;

  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.APP.TAB.TOKEN}
      screenOptions={NAVIGATION_CONFIG.HEADER_HIDDEN}
      tabBar={customTab}>
      <Tab.Screen name={SCREEN_NAMES.APP.TAB.TOKEN} component={TokenScreen} />
      <Tab.Screen name={SCREEN_NAMES.APP.TAB.LEADER} component={LeaderScreen} />
      <Tab.Screen
        name={SCREEN_NAMES.APP.TAB.PORTFOLIO}
        component={PortfolioScreen}
      />
      <Tab.Screen name={SCREEN_NAMES.APP.TAB.COPIED} component={CopiedScreen} />
      <Tab.Screen name={SCREEN_NAMES.APP.TAB.WALLET} component={WalletScreen} />
      <Tab.Screen
        name={SCREEN_NAMES.APP.TAB.PROFILE}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
