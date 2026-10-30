import type { Dayjs } from 'dayjs';
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import {
  Easing,
  useSharedValue,
  type SharedValue,
  withTiming,
} from 'react-native-reanimated';

export type Tab = 'calendar' | 'search';

type Picked = { date: string; nonce: number } | null;

type AppContextValue = {
  tab: Tab;
  changeTab: (tab: Tab) => void;
  tabProgress: SharedValue<number>;
  picked: Picked;
  pickDate: (date: Dayjs) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<Tab>('calendar');
  const [picked, setPicked] = useState<Picked>(null);
  const tabProgress = useSharedValue(0);

  const changeTab = (next: Tab) => {
    if (next === tab) return;

    setTab(next);
    tabProgress.value = withTiming(next === 'search' ? 1 : 0, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  };

  const pickDate = (date: Dayjs) => {
    setPicked({ date: date.format('YYYY-MM-DD'), nonce: Date.now() });
    changeTab('calendar');
  };

  return (
    <AppContext.Provider
      value={{ tab, changeTab, tabProgress, picked, pickDate }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return value;
}
