import dayjs, { type Dayjs } from 'dayjs';
import { getLunarDayLabel } from '@/lib/core';

export type Pager = {
  go: (delta: number) => void;
  scrollToMonth: (month: Dayjs) => void;
  getIndex: () => number;
};

export const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const MONTHS = Array.from({ length: 200 * 12 }, (_, index) =>
  dayjs('1900-01-01').add(index, 'month'),
);

// 48px 标题行 + 36px 星期行（28px + 8px 间距）+ 372px 网格。
export const PAGE_HEIGHT = 456;

export interface DayInfo {
  date: Dayjs;
  label: string;
  accent: boolean;
  inMonth: boolean;
}

export const DAY_CACHE = new Map<string, DayInfo[]>();

export function buildDays(month: Dayjs): DayInfo[] {
  const key = month.format('YYYY-MM');
  const cached = DAY_CACHE.get(key);
  if (cached) return cached;

  const first = month.startOf('month');
  const gridStart = first.subtract(first.day(), 'day');
  const rows = Math.ceil((first.day() + month.daysInMonth()) / 7);

  const days = Array.from({ length: rows * 7 }, (_, index) => {
    const date = gridStart.add(index, 'day');
    const { lunarDay, lunarMonth, solarTerm } = getLunarDayLabel(date);

    let label = lunarDay;
    let accent = false;

    if (solarTerm) {
      label = solarTerm;
      accent = true;
    } else if (lunarDay === '初一') {
      label = `${lunarMonth}月`;
      accent = true;
    } else if (lunarDay === '十五') {
      accent = true;
    }

    return {
      date,
      label,
      accent,
      inMonth: date.month() === month.month(),
    };
  });

  DAY_CACHE.set(key, days);
  if (DAY_CACHE.size > 36) DAY_CACHE.clear();

  return days;
}

export function monthIndex(month: Dayjs): number {
  return Math.max(
    0,
    Math.min(
      MONTHS.length - 1,
      (month.year() - MONTHS[0]!.year()) * 12 + month.month(),
    ),
  );
}
