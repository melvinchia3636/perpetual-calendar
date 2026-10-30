import type { MatchScope, YijiType } from '../../../lib/core';

export type SearchParams = {
  month: string;
  activity: string;
  type: YijiType;
  scope: MatchScope;
};
