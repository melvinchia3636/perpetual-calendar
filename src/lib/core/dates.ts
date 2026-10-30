import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/** Strictly parse `2026-10-30` / `2026-10-3`; rejects impossible dates. */
export function parseDay(value: string | Dayjs): Dayjs {
  if (dayjs.isDayjs(value)) return value;

  const parsed = dayjs(value, ['YYYY-M-D', 'YYYY-MM-DD'], true);
  if (!parsed.isValid()) {
    throw new Error(`Invalid date "${value}", expected YYYY-MM-DD`);
  }

  return parsed;
}

/** Strictly parse `2026-10` and normalise to the first day of the month. */
export function parseMonth(value: string | Dayjs): Dayjs {
  if (dayjs.isDayjs(value)) return value.startOf('month');

  const parsed = dayjs(value, ['YYYY-MM', 'YYYY-M'], true);
  if (!parsed.isValid()) {
    throw new Error(`Invalid month "${value}", expected YYYY-MM`);
  }

  return parsed.startOf('month');
}
