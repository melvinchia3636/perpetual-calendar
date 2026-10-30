import type { Dayjs } from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useCalendar } from '../../../contexts/CalendarContext';
import { MonthPage } from '../components/MonthPage';
import { buildDays } from '../lib';

export function useMonthPages(
  handleSelect: (date: Dayjs) => void,
  pageWidth: number,
) {
  const { selected, setPickerMonth } = useCalendar();
  const selectedTs = useMemo(
    () => selected.startOf('day').valueOf(),
    [selected],
  );

  const renderItem = useCallback(
    ({ item }: { item: Dayjs }) => {
      const days = buildDays(item);
      const first = days[0]!.date.valueOf();
      const last = days[days.length - 1]!.date.valueOf();
      const pageSelectedTs =
        selectedTs >= first && selectedTs <= last ? selectedTs : null;

      return (
        <MonthPage
          month={item}
          selectedTs={pageSelectedTs}
          onSelect={handleSelect}
          onPressMonth={setPickerMonth}
          width={pageWidth}
        />
      );
    },
    [handleSelect, setPickerMonth, pageWidth, selectedTs],
  );

  const keyExtractor = useCallback(
    (month: Dayjs) => month.format('YYYY-MM'),
    [],
  );

  return { renderItem, keyExtractor };
}
