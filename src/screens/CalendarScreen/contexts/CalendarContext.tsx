import dayjs, { type Dayjs } from 'dayjs';
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { useSharedValue, type SharedValue } from 'react-native-reanimated';
import { getDay } from '@/lib/core';

const DETAIL_CACHE = new Map<string, ReturnType<typeof getDay>>();

type CalendarContextValue = {
  cursor: Dayjs;
  setCursor: Dispatch<SetStateAction<Dayjs>>;
  selected: Dayjs;
  setSelected: Dispatch<SetStateAction<Dayjs>>;
  details: ReturnType<typeof getDay>;
  sheetProgress: SharedValue<number>;
  pickerMonth: Dayjs | null;
  setPickerMonth: Dispatch<SetStateAction<Dayjs | null>>;
  ready: boolean;
  setReady: Dispatch<SetStateAction<boolean>>;
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState(() => dayjs().startOf('month'));
  const [selected, setSelected] = useState(() => dayjs());
  const details = useMemo(() => {
    const key = selected.format('YYYY-MM-DD');
    const cached = DETAIL_CACHE.get(key);
    if (cached) return cached;

    const value = getDay(selected);
    DETAIL_CACHE.set(key, value);
    if (DETAIL_CACHE.size > 90) {
      const oldest = DETAIL_CACHE.keys().next().value;
      if (oldest) DETAIL_CACHE.delete(oldest);
    }

    return value;
  }, [selected]);
  const sheetProgress = useSharedValue(0);
  const [pickerMonth, setPickerMonth] = useState<Dayjs | null>(null);
  const [ready, setReady] = useState(false);

  return (
    <CalendarContext.Provider
      value={{
        cursor,
        setCursor,
        selected,
        setSelected,
        details,
        sheetProgress,
        pickerMonth,
        setPickerMonth,
        ready,
        setReady,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const value = useContext(CalendarContext);

  if (!value) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }

  return value;
}
