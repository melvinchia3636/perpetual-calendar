import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  Easing,
  useSharedValue,
  type SharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { findGoodDays, type GoodDaysResult } from '@/lib/core';
import type { SearchParams } from '../../../types';

type SearchTabContextValue = {
  params: SearchParams | null;
  progress: SharedValue<number>;
  result: GoodDaysResult | null;
  open: (next: SearchParams) => void;
  close: () => void;
};

const SearchTabContext = createContext<SearchTabContextValue | null>(null);

export function SearchTabProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useState<SearchParams | null>(null);
  const progress = useSharedValue(0);

  const result = useMemo(
    () =>
      params
        ? findGoodDays(params.month, params.activity, {
            type: params.type,
            scope: params.scope,
          })
        : null,
    [params],
  );

  const open = useCallback(
    (next: SearchParams) => {
      progress.value = 0;
      setParams(next);
    },
    [progress],
  );

  useEffect(() => {
    if (!params) return;

    progress.value = withTiming(1, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [params, progress]);

  const close = useCallback(() => {
    progress.value = withTiming(
      0,
      { duration: 220, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) scheduleOnRN(setParams, null);
      },
    );
  }, [progress]);

  return (
    <SearchTabContext.Provider
      value={{ params, progress, result, open, close }}
    >
      {children}
    </SearchTabContext.Provider>
  );
}

export function useSearchTab() {
  const value = useContext(SearchTabContext);

  if (!value) {
    throw new Error('useSearchTab must be used within a SearchTabProvider');
  }

  return value;
}
