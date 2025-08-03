import {createContext, ReactNode, useCallback, useState} from 'react';
import {FilterContextType} from '../types';

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export const FilterProvider = ({children}: {children: ReactNode}) => {
  const [tokenFilter, setTokenFilter] = useState<
    FilterContextType['tokenFilter']
  >({
    marketCap: {
      min: 0,
      max: 0,
    },
    volume: {
      min: 0,
      max: 0,
    },
    liquidity: {
      min: 0,
      max: 0,
    },
  });
  const [timeRange, setTimeRange] = useState<FilterContextType['timeRange']>();

  const handleSetTokenFilter = useCallback(
    (data: FilterContextType['tokenFilter']) => {
      setTokenFilter(data);
    },
    [],
  );

  const handleSetTimeRange = useCallback(
    (data: FilterContextType['timeRange']) => {
      setTimeRange(data);
    },
    [],
  );

  const handleClearTimeRange = useCallback(() => {
    setTimeRange(undefined);
  }, []);

  const resetTokenFilter = useCallback(() => {
    setTokenFilter({
      marketCap: {
        min: 0,
        max: 0,
      },
      volume: {
        min: 0,
        max: 0,
      },
      liquidity: {
        min: 0,
        max: 0,
      },
    });
  }, []);

  const value: FilterContextType = {
    tokenFilter,
    setTokenFilter: handleSetTokenFilter,
    resetTokenFilter,
    timeRange,
    setTimeRange: handleSetTimeRange,
    clearTimeRange: handleClearTimeRange,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
