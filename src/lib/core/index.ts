/**
 * Public almanac API.
 *
 * Fully offline and JSON-serialisable; no network, filesystem or console
 * access. Safe to import from Expo / React Native.
 */

export type {
  Almanac,
  DateParts,
  DayCalendarInfo,
  DayDetails,
  TimeSlot,
} from './types';

export { parseDay, parseMonth } from './dates';

export { getDay, getLunarDayLabel } from './day';

export { findGoodDays } from './find-good-days';
export type {
  DayMatch,
  FindGoodDaysOptions,
  GoodDaysResult,
  HourMatch,
  MatchScope,
  YijiType,
} from './find-good-days';
