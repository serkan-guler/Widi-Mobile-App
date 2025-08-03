import {
  NavigationContainer,
  DefaultTheme,
  type LinkingOptions,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {NAVIGATION_CONFIG, SCREEN_NAMES} from '../constants/navigation';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {memo} from 'react';
import {Platform} from 'react-native';
import {useSession} from '../hooks';
import {PageLoading} from '../components';
import {COLORS} from '../constants/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const prefix = Platform.select({
  ios: 'widi://',
  android: 'widi://twitter',
  default: 'widi://',
});

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Auth: {
        screens: {
          GetUsername: {
            path: 'twitter/callback',
          },
        },
      },
    },
  },
};

const RootNavigator = () => {
  const {sessionIsLoading, isAuth} = useSession();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.DARK,
      primary: COLORS.PRIMARY,
    },
  };

  return (
    <NavigationContainer linking={linking} theme={theme}>
      {!sessionIsLoading ? (
        <RootStack.Navigator
          initialRouteName={
            isAuth ? SCREEN_NAMES.ROOT.APP : SCREEN_NAMES.ROOT.AUTH
          }
          screenOptions={NAVIGATION_CONFIG.HEADER_HIDDEN}>
          {isAuth ? (
            <RootStack.Screen
              name={SCREEN_NAMES.ROOT.APP}
              component={AppNavigator}
            />
          ) : (
            <RootStack.Screen
              name={SCREEN_NAMES.ROOT.AUTH}
              component={AuthNavigator}
            />
          )}
        </RootStack.Navigator>
      ) : (
        <PageLoading />
      )}
    </NavigationContainer>
  );
};

export default memo(RootNavigator);
