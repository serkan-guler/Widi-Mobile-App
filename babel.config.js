module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: [
          'API_URL',
          'WS_URL',
          'CRYPTO_SECRET',
          'GOOGLE_CLIENT_ID',
          'GOOGLE_IOS_CLIENT_ID',
          'GOOGLE_ANDROID_CLIENT_ID',
          'MICROSOFT_CLIENT_ID',
          'MICROSOFT_TENANT_ID',
          'MSAL_REDIRECT_IOS',
          'MSAL_REDIRECT_ANDROID',
          'SOLSCAN_TOKEN_URL',
          'SOL_MINT',
          'TOKEN_SERVICE',
          'WALLET_SERVICE',
          'APP_VERSION',
          'FEE_ACCOUNT',
        ],
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          crypto: 'react-native-quick-crypto',
          stream: 'readable-stream',
          buffer: 'buffer',
        },
      },
    ],
  ],
};
