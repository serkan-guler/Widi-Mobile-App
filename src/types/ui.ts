import {PropsWithChildren} from 'react';

export type TouchpadValueType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 0
  | '.'
  | 'del';

export type StatusTypes = 'success' | 'warning' | 'error';

export type LayoutProps = PropsWithChildren<{
  isLoading?: boolean;
}>;

export type ScrollLayoutProps = LayoutProps & {
  refreshing?: boolean;
  onRefresh?: () => Promise<void>;
};
