import type { Dayjs } from 'dayjs';
import { Solar } from 'lunar-javascript';
import { parseMonth } from './dates';

export type YijiType = 'yi' | 'ji';

/** Where the activity must appear: whole day, a 时辰, or either. */
export type MatchScope = 'day' | 'hour' | 'both';

export interface FindGoodDaysOptions {
  /** `yi` (宜, default) or `ji` (忌). */
  type?: YijiType;
  /** `day` (default), `hour`, or `both`. */
  scope?: MatchScope;
}

export interface HourMatch {
  startTime: string;
  endTime: string;
  ganzhi: string;
  tianshen: string;
  tianshenLuck: string;
  chongShengXiao: string;
  sha: string;
  yi: string[];
  ji: string[];
}

export interface DayMatch {
  date: string;
  weekday: string;
  lunar: string;
  /** 年柱，如 丙午。 */
  ganzhiYear: string;
  /** 月柱，如 戊戌。 */
  ganzhiMonth: string;
  ganzhiDay: string;
  tianshen: string;
  /** 建除十二神，如 成。 */
  zhixing: string;
  /** 廿八宿全称，如 参水猿。 */
  xiu: string;
  /** 相冲生肖，如 鼠。 */
  chongShengXiao: string;
  yi: string[];
  ji: string[];
  /** Activity appears in the day-level list. */
  dayMatch: boolean;
  /** 时辰 where the activity appears (empty when none). */
  hours: HourMatch[];
}

export interface GoodDaysResult {
  month: string;
  activity: string;
  type: YijiType;
  scope: MatchScope;
  matches: DayMatch[];
}

const WEEKDAYS = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

/**
 * List the days (and/or 时辰) in a month whose 宜/忌 list contains `activity`.
 *
 * Uses lunar-javascript with **sect 1** (the 1.7.x default): on a 节 day the
 * whole day belongs to the new month. This is a deliberate product choice and
 * differs from qmrl888's own data on the 12 节 days.
 */
export function findGoodDays(
  month: string | Dayjs,
  activity: string,
  options: FindGoodDaysOptions = {},
): GoodDaysResult {
  const start = parseMonth(month);
  const term = activity.trim();
  if (!term) throw new Error('Activity must not be empty');

  const type = options.type ?? 'yi';
  const scope = options.scope ?? 'day';
  const matches: DayMatch[] = [];

  for (let i = 0; i < start.daysInMonth(); i++) {
    const day = start.add(i, 'day');
    const lunar = Solar.fromYmd(day.year(), day.month() + 1, day.date()).getLunar();

    const yi = lunar.getDayYi(1);
    const ji = lunar.getDayJi(1);
    const dayMatch = (type === 'yi' ? yi : ji).includes(term);

    const hours: HourMatch[] = [];
    for (const slot of lunar.getTimes()) {
      const slotYi = slot.getYi();
      const slotJi = slot.getJi();
      if (!(type === 'yi' ? slotYi : slotJi).includes(term)) continue;

      hours.push({
        startTime: slot.getMinHm(),
        endTime: slot.getMaxHm(),
        ganzhi: slot.getGanZhi(),
        tianshen: slot.getTianShen(),
        tianshenLuck: slot.getTianShenLuck(),
        chongShengXiao: slot.getChongShengXiao(),
        sha: slot.getSha(),
        yi: slotYi,
        ji: slotJi,
      });
    }

    const included =
      scope === 'both'
        ? dayMatch || hours.length > 0
        : scope === 'hour'
          ? hours.length > 0
          : dayMatch;

    if (!included) continue;

    matches.push({
      date: day.format('YYYY-MM-DD'),
      weekday: WEEKDAYS[day.day()]!,
      lunar: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
      ganzhiYear: lunar.getYearInGanZhiByLiChun(),
      ganzhiMonth: lunar.getMonthInGanZhi(),
      ganzhiDay: lunar.getDayInGanZhi(),
      tianshen: lunar.getDayTianShen(),
      zhixing: lunar.getZhiXing(),
      xiu: `${lunar.getXiu()}${lunar.getZheng()}${lunar.getAnimal()}`,
      chongShengXiao: (
        lunar as unknown as {
          getDayChongShengXiao?: () => string;
        }
      ).getDayChongShengXiao?.() ?? '',
      yi,
      ji,
      dayMatch,
      hours,
    });
  }

  return {
    month: start.format('YYYY-MM'),
    activity: term,
    type,
    scope,
    matches,
  };
}
