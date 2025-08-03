import {createContext, useContext} from 'react';
import {TextStyle, ViewStyle} from 'react-native';

type TabContextType = {
  activeTab: number;
  handleSetActiveTab: (index: number) => void;
  scrollAnimation?: boolean;
  type?: 'default' | 'status';
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};
