export const API_URLS = {
  signInWithGoogleUrl: '/auth/google',
  signInWithMicrosoftUrl: '/auth/microsoft',
  signInWithTwitterUrl: '/auth/twitter',
  registerUrl: '/auth/register',
  getTokenUrl: '/auth/get-token',
  getUserData: '/auth/get-user',
  logoutUrl: '/auth/logout',
  loginUrl: '/auth/login',
};

export const TOKEN_URLS = {
  tokensUrl: '/token',
  tokenDetail: '/token/detail',
  tokenChartData: '/token/chart-data',
  tokenStatsData: '/token/stats',
  tokenHoldersData: '/token/holders',
  tokenPnlData: '/token/pnl',
  tokenQuote: '/token/quote',
  tokenSwap: '/token/swap',
  tokenSwapPool: '/token/token-swap',
  tokenSearchHistory: '/token/search-history',
  tokenPrice: '/token/get-token-price',
  simulateTransaction: '/token/simulate-transaction',
};

export const WALLET_URLS = {
  searchDomainUrl: '/wallet/search-widi-domain',
  walletUrl: '/wallet',
  widiDomainUrl: '/wallet/widi-domain',
  tokensUrl: '/wallet/tokens',
  checkToWalletAddressUrl: '/wallet/is-valid-wallet',
  walletBalanceUrl: '/wallet/get-balance',
  walletTradeBalanceUrl: '/wallet/get-wallet-balance',
  sendTransactionUrl: '/wallet/send-transaction',
  buildTransactionUrl: '/wallet/build-transaction',
};

export const PORTFOLIO_URLS = {
  checkPortfolioNameUrl: '/portfolio/check-portfolio-name',
  // HACK: Burada geliştirme ortamı için oluşturuldu, -dev silinecek
  createPortfolioUrl: '/portfolio/create-portfolio-dev',
  activePortfoliosUrl: '/portfolio/active-portfolios',
  passivePortfoliosUrl: '/portfolio/passive-portfolios',
  trendingLeadersUrl: '/portfolio/trending',
  mostCopiedLeadersUrl: '/portfolio/most-copied',
  favoritedLeadersUrl: '/portfolio/favorited',
  copyDetailUrl: '/portfolio/copy-detail',
  checkPortfolioCodeUrl: '/portfolio/check-portfolio-code',
  // HACK: Burada geliştirme ortamı için oluşturuldu, -dev silinecek
  copyPortfolioUrl: '/portfolio/copy-portfolio-dev',
  signMessageUrl: '/portfolio/message-code',
};

export const USER_URLS = {
  editProfileUrl: '/user/edit-profile',
};

export const SOLANA_URLS = {
  jupiterSwapApi: 'https://lite-api.jup.ag/swap/v1',
  jupiterPriceApi: 'https://lite-api.jup.ag/price/v3',
  trackerApi: 'https://swap-v2.solanatracker.io',
};
