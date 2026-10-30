import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { MonthPicker } from '@/components/MonthPicker';
import { TabPane } from '@/components/TabPane';
import { useApp } from '@/contexts/AppContext';
import { MonthCalendar } from './components/MonthCalendar';
import { DaySheet } from './components/DaySheet';
import { CalendarProvider, useCalendar } from './contexts/CalendarContext';

export function CalendarScreen() {
  return (
    <TabPane side="calendar">
      <CalendarProvider>
        <CalendarContent />
      </CalendarProvider>
    </TabPane>
  );
}

function CalendarContent() {
  const { picked } = useApp();
  const { setCursor, setSelected, pickerMonth, setPickerMonth } = useCalendar();
  const lastPick = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!picked || picked.nonce === lastPick.current) return;

    lastPick.current = picked.nonce;
    setSelected(dayjs(picked.date));
    setCursor(dayjs(picked.date).startOf('month'));
  }, [picked, setCursor, setSelected]);

  return (
    <View className="flex-1 bg-app">
      <MonthCalendar />
      <DaySheet />
      {pickerMonth && (
        <MonthPicker
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
