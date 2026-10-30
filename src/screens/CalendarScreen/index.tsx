import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { MonthCalendar } from './components/MonthCalendar';
import { MonthPicker } from '../../components/MonthPicker';
import { DaySheet } from './components/DaySheet';
import { getDay } from '../../lib/core';

const DETAIL_CACHE = new Map<string, ReturnType<typeof getDay>>();

export function CalendarScreen({
  active,
  picked,
}: {
  active: boolean;
  picked: { date: string; nonce: number } | null;
}) {
  const [cursor, setCursor] = useState(() => dayjs().startOf('month'));
  const [selected, setSelected] = useState(() => dayjs());
  const today = useMemo(() => dayjs(), []);
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
  const { height } = useWindowDimensions();
  const sheetIndex = useSharedValue(0);
  const sheetProgress = useSharedValue(0);
  const [sheetKey, setSheetKey] = useState(0);
  const [pickerMonth, setPickerMonth] = useState<dayjs.Dayjs | null>(null);
  const [sheetAreaHeight, setSheetAreaHeight] = useState(0);
  const lastPick = useRef<number | undefined>(undefined);

  const changeMonth = useCallback((month: dayjs.Dayjs) => {
    setCursor(month);
  }, []);

  const selectDate = useCallback((date: dayjs.Dayjs) => {
    setSelected(date);
  }, []);

  const openMonthPicker = useCallback((month: dayjs.Dayjs) => {
    setPickerMonth(month);
  }, []);

  // A date picked in the 良辰吉日查询 tab.
  useEffect(() => {
    if (!picked || picked.nonce === lastPick.current) return;

    lastPick.current = picked.nonce;
    setSelected(dayjs(picked.date));
    setCursor(dayjs(picked.date).startOf('month'));
    sheetIndex.value = 0;
  }, [picked, sheetIndex]);

  // Collapse the drawer whenever the calendar tab becomes active.
  useEffect(() => {
    if (active) sheetIndex.value = 0;
  }, [active, sheetIndex]);

  return (
    <View className="flex-1 bg-app">
      <View
        className="flex-1 justify-center overflow-hidden"
        style={{ paddingBottom: height * 0.24 }}
      >
        <MonthCalendar
          cursor={cursor}
          selected={selected}
          today={today}
          onSelect={selectDate}
          onPressMonth={openMonthPicker}
          onMonthChange={changeMonth}
          sheetProgress={sheetProgress}
        />
      </View>

      <View
        className="absolute inset-0"
        pointerEvents="box-none"
        onLayout={(event) =>
          setSheetAreaHeight(event.nativeEvent.layout.height)
        }
      >
        <DaySheet
          details={details}
          animatedIndex={sheetIndex}
          progress={sheetProgress}
          containerHeight={sheetAreaHeight}
          // The tab bar lives outside the screen, so the drawer needs no
          // extra bottom offset.
          bottomInset={0}
          collapseSignal={sheetKey}
        />
      </View>

      {pickerMonth && (
        <MonthPicker
          visible
          value={pickerMonth}
          onClose={() => setPickerMonth(null)}
          onSelect={(next) => {
            setCursor(next);
            setPickerMonth(null);
          }}
        />
      )}
    </View>
  );
}
