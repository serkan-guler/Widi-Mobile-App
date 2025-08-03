export const SCREEN_NAMES = {
  ROOT: {
    AUTH: 'Auth' as const,
    APP: 'App' as const,
  },
  AUTH: {
    ONBOARDING: 'Onboarding' as const,
    CONNECT_ACCOUNT: 'ConnectAccount' as const,
    GET_USERNAME: 'GetUsername' as const,
    WIDI_CODE: 'WidiCode' as const,
    TERMS_MODAL: 'TermsModal' as const,
    PRIVACY_MODAL: 'PrivacyModal' as const,
  },
  APP: {
    TAB: {
      TAB: 'Tab' as const,
      LEADER: 'Leader' as const,
      TOKEN: 'Token' as const,
      WALLET: 'Wallet' as const,
      COPIED: 'Copied' as const,
      PORTFOLIO: 'Portfolio' as const,
      PROFILE: 'Profile' as const,
    },
    // Profile
    EDIT_PROFILE: 'EditProfile' as const,
    LANGUAGE: 'Language' as const,
    NOTIFICATIONS: 'Notifications' as const,
    PRIVACY: 'Privacy' as const,
    TERMS: 'Terms' as const,
    // Token
    TOKEN_FILTER: 'TokenFilter' as const,
    TOKEN_SEARCH: 'TokenSearch' as const,
    TOKEN_DETAIL: 'TokenDetail' as const,
    TOKEN_TRADE: 'TokenTrade' as const,
    TRANSACTION_SETTING: 'TransactionSetting' as const,
    SORT_TIME: 'SortTime' as const,
    // Wallet
    DOMAIN: 'Domain' as const,
    EXPORT_WALLET: 'ExportWallet' as const,
    SELECT_SEND_TOKEN: 'SelectSendToken' as const,
    CHECK_SEND_WALLET: 'CheckSendWallet' as const,
    SEND_TOKEN: 'Send' as const,
    SEND_TOKEN_SUMMARY: 'SendSummary' as const,
    // Copied
    COPY_DETAIL: 'CopyDetail' as const,
    PRIVATE_CODE: 'PrivateCode' as const,
    COPY_AMOUNT: 'CopyAmount' as const,
    // Portfolio
    BE_A_LEADER: 'BeLeader' as const,
  },
};

export const ROUTE_PARAMS = {
  CONNECT_ACCOUNT: {
    TYPE: 'type' as const,
  },
};

export const NAVIGATION_CONFIG = {
  INITIAL_ROUTE: SCREEN_NAMES.ROOT.AUTH,
  HEADER_HIDDEN: {headerShown: false},
};
