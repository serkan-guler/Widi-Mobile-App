import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../types';
import {memo} from 'react';
import {SCREEN_NAMES} from '../constants/navigation';
import {
  ConnectAccountScreen,
  GetUsernameScreen,
  PageOneScreen,
  WidiCodeScreen,
} from '../screens/auth';
import {PrivacyModal, TermsModal} from '../screens/modal';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen
          name={SCREEN_NAMES.AUTH.ONBOARDING}
          component={PageOneScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.AUTH.CONNECT_ACCOUNT}
          component={ConnectAccountScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.AUTH.GET_USERNAME}
          component={GetUsernameScreen}
        />
        <Stack.Screen
          name={SCREEN_NAMES.AUTH.WIDI_CODE}
          component={WidiCodeScreen}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={SCREEN_NAMES.AUTH.TERMS_MODAL}
          component={TermsModal}
        />
        <Stack.Screen
          name={SCREEN_NAMES.AUTH.PRIVACY_MODAL}
          component={PrivacyModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default memo(AuthNavigator);
