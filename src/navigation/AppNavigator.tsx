import {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from '../types';
import TabStack from './TabNavigator';
import {NAVIGATION_CONFIG, SCREEN_NAMES} from '../constants/navigation';
import {
  BeLeaderScreen,
  CopyAmountScreen,
  CopyDetailScreen,
  DomainScreen,
  EditProfileScreen,
  LanguageScreen,
  NotificationsScreen,
  PrivateCodeScreen,
  SortTimeScreen,
  TokenDetailScreen,
  TokenFilterScreen,
  TokenSearchScreen,
  TokenTradeScreen,
  TransactionSettingScreen,
  ExportWalletScreen,
  CheckSendToScreen,
  SelectTokenScreen,
  SendScreen,
  SendSummaryScreen,
  PrivacyScreen,
  TermsScreen,
} from '../screens/app';
import AppProvider from '../providers/AppProvider';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <AppProvider>
      <AppStack.Navigator
        initialRouteName={SCREEN_NAMES.APP.TAB.TAB}
        screenOptions={NAVIGATION_CONFIG.HEADER_HIDDEN}>
        <AppStack.Screen name={SCREEN_NAMES.APP.TAB.TAB} component={TabStack} />
        {/* Profile */}
        <AppStack.Screen
          name={SCREEN_NAMES.APP.EDIT_PROFILE}
          component={EditProfileScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.LANGUAGE}
          component={LanguageScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.NOTIFICATIONS}
          component={NotificationsScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.PRIVACY}
          component={PrivacyScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.TERMS}
          component={TermsScreen}
        />
        {/* Token */}
        <AppStack.Screen
          name={SCREEN_NAMES.APP.TOKEN_FILTER}
          component={TokenFilterScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.TOKEN_SEARCH}
          component={TokenSearchScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.TOKEN_DETAIL}
          component={TokenDetailScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.TOKEN_TRADE}
          component={TokenTradeScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.TRANSACTION_SETTING}
          component={TransactionSettingScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.SORT_TIME}
          component={SortTimeScreen}
        />

        {/* Wallet */}
        <AppStack.Screen
          name={SCREEN_NAMES.APP.DOMAIN}
          component={DomainScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.EXPORT_WALLET}
          component={ExportWalletScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.SELECT_SEND_TOKEN}
          component={SelectTokenScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.CHECK_SEND_WALLET}
          component={CheckSendToScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.SEND_TOKEN}
          component={SendScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.SEND_TOKEN_SUMMARY}
          component={SendSummaryScreen}
        />

        {/* Profile */}
        <AppStack.Screen
          name={SCREEN_NAMES.APP.BE_A_LEADER}
          component={BeLeaderScreen}
        />
        {/* Copied */}
        <AppStack.Screen
          name={SCREEN_NAMES.APP.COPY_DETAIL}
          component={CopyDetailScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.PRIVATE_CODE}
          component={PrivateCodeScreen}
        />
        <AppStack.Screen
          name={SCREEN_NAMES.APP.COPY_AMOUNT}
          component={CopyAmountScreen}
        />
      </AppStack.Navigator>
    </AppProvider>
  );
};

export default memo(AppNavigator);
