/** Day-level domain types. Only what a calendar app needs for one date. */

export interface DateParts {
  year: number;
  month: number;
  day: number;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  ganzhi: string;
  gan: string;
  zhi: string;
  shengxiao: string;
  tianshen: string;
  tianshenType: string;
  tianshenLuck: string;
  yi: string[];
  ji: string[];
  chongGan: string;
  chong: string;
  chongShengXiao: string;
  chongDesc: string;
  sha: string;
  nine: string;
}

export interface Almanac {
  yiji: { yi: string[]; ji: string[] };
  weekIndex: string;
  weekOfYear: number;
  weekOfMonth: number;
  solarYmd: DateParts;
  lunarYmd: { year: string; month: string; day: string };
  solarFestivals: string[];
  lunarFestivals: string[];
  taishen: string;
  pengzu: { tiangan: string; dizhi: string };
  ganzhi: Record<string, string>;
  shengxiao: Record<string, string>;
  jishen: Record<string, string>;
  jishenxiongsha: { dayJiShen: string[]; dayXiongSha: string[] };
  chongsha: Record<string, string>;
  tianshen: {
    dayTianShen: string;
    dayTianShenType: string;
    dayTianShenLuck: string;
  };
  nayin: Record<string, string>;
  zhixing: string;
  timeList: TimeSlot[];
  xiu: {
    xiu: string;
    animal: string;
    xiuLuck: string;
    xiuSong: string;
    zheng: string;
  };
  lu: string;
  shou: string;
  gong: string;
  yue: string;
  nine: { dayNineStar: string; timeNineStar: string };
  zmt: Record<string, string>;
}

/** The complete dataset for one calendar day. */
export interface DayDetails {
  /** ISO date key, e.g. `2026-10-30`. */
  date: string;
  almanac: Almanac;
  calendar: DayCalendarInfo;
}

export interface DayCalendarInfo {
  /** Western zodiac, e.g. 天蝎. */
  xingZuo: string;
  /** 六曜: 大安 / 赤口 / 先胜 / 友引 / 先负 / 佛灭. */
  liuYao: string;
  /** Solar term falling on this day, e.g. 寒露, or null. */
  solarTerm: string | null;
  julianDay: number;
  buddhistYear: number;
  /** Formatted Islamic (civil) date, e.g. `1448年05月19日`. */
  islamicDate: string;
  jieQi: SolarTermInfo | null;
}

export interface SolarTermInfo {
  /** Current solar term, e.g. 霜降. */
  name: string;
  /** 1-based day index within the term. */
  dayIndex: number;
  nextName: string;
  daysToNext: number;
}
