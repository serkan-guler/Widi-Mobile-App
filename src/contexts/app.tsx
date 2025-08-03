import {createContext, PropsWithChildren, useCallback, useState} from 'react';
import {AppContextType} from '../types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: PropsWithChildren) => {
  const [bottomTabBarHeight, setBottomTabBarHeight] = useState<number>(0);

  const handleSetBottomTabBarHeight = useCallback((height: number) => {
    setBottomTabBarHeight(height);
  }, []);

  const value: AppContextType = {
    bottomTabBarHeight,
    setBottomTabBarHeight: handleSetBottomTabBarHeight,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
