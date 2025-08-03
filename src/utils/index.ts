export * from './message';
export * from './formatNumber';
export * from './formatString';
export * from './formatDate';
export * from './clipboard';
export * from './browser';
export * from './storage';
export * from './solana';
export * from './array';

export const sleep = (ms: number = 300) =>
  new Promise(resolve => setTimeout(resolve, ms));
