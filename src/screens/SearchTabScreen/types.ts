import type { Dayjs } from 'dayjs';
import type { MatchScope, YijiType } from '@/lib/core';

export type SearchParams<TMonth extends string | Dayjs = string> = {
  month: TMonth;
  activity: string;
  type: YijiType;
  scope: MatchScope;
};
