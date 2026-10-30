import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { LunarYear, Solar } from 'lunar-javascript';
import { parseDay } from './dates';
import { gregorianToHijri } from './hijri';
import type { Almanac, DayCalendarInfo, DayDetails } from './types';

dayjs.extend(isoWeek);

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
 * Full day details, computed entirely offline with lunar-javascript 1.7.7.
 *
 * 宜/忌 use **sect 1** (`getDayYi(1)`): on a 节 day the whole day belongs to
 * the new month. Everything is derived from the same library, so day details
 * and month search can never disagree.
 */
export function getDay(value: string | Dayjs): DayDetails {
  const day = parseDay(value);
  const solar = Solar.fromYmd(day.year(), day.month() + 1, day.date());
  const lunar = solar.getLunar();
  const year = LunarYear.fromYear(day.year());

  const almanac: Almanac = {
    yiji: {
      yi: lunar.getDayYi(1),
      ji: lunar.getDayJi(1),
    },
    weekIndex: WEEKDAYS[day.day()]!,
    weekOfYear: day.isoWeek(),
    weekOfMonth: Math.ceil(day.date() / 7),
    solarYmd: {
      year: day.year(),
      month: day.month() + 1,
      day: day.date(),
    },
    lunarYmd: {
      year: lunar.getYearInChinese(),
      month: lunar.getMonthInChinese(),
      day: lunar.getDayInChinese(),
    },
    solarFestivals: [
      ...solar.getFestivals(),
      ...solar.getOtherFestivals(),
    ],
    lunarFestivals: [
      ...lunar.getFestivals(),
      ...lunar.getOtherFestivals(),
      ...(lunar.getJieQi() ? [lunar.getJieQi()] : []),
    ],
    taishen: lunar.getDayPositionTai(),
    pengzu: {
      tiangan: lunar.getPengZuGan(),
      dizhi: lunar.getPengZuZhi(),
    },
    ganzhi: {
      yearGanZhiByLiChun: lunar.getYearGanByLiChun(),
      yearZhiByLiChun: lunar.getYearZhiByLiChun(),
      yearInGanZhiByLiChun: lunar.getYearInGanZhiByLiChun(),
      monthGan: lunar.getMonthGan(),
      monthZhi: lunar.getMonthZhi(),
      monthInGanZhi: lunar.getMonthInGanZhi(),
      dayGan: lunar.getDayGan(),
      dayZhi: lunar.getDayZhi(),
      dayInGanZhi: lunar.getDayInGanZhi(),
    },
    shengxiao: {
      yearShengXiaoByLiChun: lunar.getYearShengXiaoByLiChun(),
      monthShengXiao: lunar.getMonthShengXiao(),
      dayShengXiao: lunar.getDayShengXiao(),
    },
    jishen: {
      dayYangGui: lunar.getDayPositionYangGuiDesc(),
      dayYinGui: lunar.getDayPositionYinGuiDesc(),
      dayXi: lunar.getDayPositionXiDesc(),
      dayFu: lunar.getDayPositionFuDesc(),
      dayCai: lunar.getDayPositionCaiDesc(),
    },
    jishenxiongsha: {
      dayJiShen: lunar.getDayJiShen(),
      dayXiongSha: lunar.getDayXiongSha(),
    },
    chongsha: {
      dayChongDesc: lunar.getDayChongDesc(),
      dayChongShengXiao:
        (
          lunar as unknown as {
            getDayChongShengXiao?: () => string;
          }
        ).getDayChongShengXiao?.() ?? '',
      daySha: lunar.getDaySha(),
      timeChongGan: lunar.getTimeChongGan(),
      timeChongShengXiao: lunar.getTimeChongShengXiao(),
      timeChong: lunar.getTimeChong(),
      timeChongDesc: lunar.getTimeChongDesc(),
      timeSha: lunar.getTimeSha(),
    },
    tianshen: {
      dayTianShen: lunar.getDayTianShen(),
      dayTianShenType: lunar.getDayTianShenType(),
      dayTianShenLuck: lunar.getDayTianShenLuck(),
    },
    nayin: {
      yearNaYin: lunar.getYearNaYin(),
      monthNaYin: lunar.getMonthNaYin(),
      dayNaYin: lunar.getDayNaYin(),
      timeNaYin: lunar.getTimeNaYin(),
    },
    zhixing: lunar.getZhiXing(),
    timeList: lunar.getTimes().map((slot) => ({
      startTime: slot.getMinHm(),
      endTime: slot.getMaxHm(),
      ganzhi: slot.getGanZhi(),
      gan: slot.getGan(),
      zhi: slot.getZhi(),
      shengxiao: slot.getShengXiao(),
      tianshen: slot.getTianShen(),
      tianshenType: slot.getTianShenType(),
      tianshenLuck: slot.getTianShenLuck(),
      yi: slot.getYi(),
      ji: slot.getJi(),
      chongGan: slot.getChongGan(),
      chong: slot.getChong(),
      chongShengXiao: slot.getChongShengXiao(),
      chongDesc: slot.getChongDesc(),
      sha: slot.getSha(),
      nine: slot.getNineStar().toFullString(),
    })),
    xiu: {
      xiu: lunar.getXiu(),
      animal: lunar.getAnimal(),
      xiuLuck: lunar.getXiuLuck(),
      xiuSong: lunar.getXiuSong(),
      zheng: lunar.getZheng(),
    },
    lu: lunar.getDayLu(),
    shou: lunar.getShou(),
    gong: lunar.getGong(),
    yue: lunar.getYueXiang(),
    nine: {
      dayNineStar: lunar.getDayNineStar().toFullString(),
      timeNineStar: lunar.getTimeNineStar().toFullString(),
    },
    zmt: {
      touLiang: year.getTouLiang(),
      caoZi: year.getCaoZi(),
      gengTian: year.getGengTian(),
      huaShou: year.getHuaShou(),
      zhiShui: year.getZhiShui(),
      tuoGu: year.getTuoGu(),
      qiangMi: year.getQiangMi(),
      kanCan: year.getKanCan(),
      gongZhu: year.getGongZhu(),
      jiaTian: year.getJiaTian(),
      fenBing: year.getFenBing(),
      deJin: year.getDeJin(),
      renBing: year.getRenBing(),
      renChu: year.getRenChu(),
    },
  };

  const prev = lunar.getPrevJieQi();
  const next = lunar.getNextJieQi();
  const prevSolar = prev?.getSolar();
  const nextSolar = next?.getSolar();
  const hijri = gregorianToHijri(day.year(), day.month() + 1, day.date());

  const calendar: DayCalendarInfo = {
    xingZuo: solar.getXingZuo(),
    liuYao: lunar.getLiuYao(),
    solarTerm: lunar.getJieQi() || null,
    julianDay: solar.getJulianDay(),
    buddhistYear: day.year() + 544,
    islamicDate: `${hijri.year}年${String(hijri.month).padStart(2, '0')}月${String(hijri.day).padStart(2, '0')}日`,
    jieQi:
      prevSolar && nextSolar
        ? {
            name: prev!.getName(),
            dayIndex: day.diff(dayjs(prevSolar.toYmd()), 'day') + 1,
            nextName: next!.getName(),
            daysToNext: dayjs(nextSolar.toYmd()).diff(day, 'day'),
          }
        : null,
  };

  return { date: day.format('YYYY-MM-DD'), almanac, calendar };
}

/** Fast path for calendar cells: only the lunar label + solar term. */
export function getLunarDayLabel(day: Dayjs): {
  lunarDay: string;
  lunarMonth: string;
  solarTerm: string | null;
} {
  const lunar = Solar.fromYmd(day.year(), day.month() + 1, day.date()).getLunar();

  return {
    lunarDay: lunar.getDayInChinese(),
    lunarMonth: lunar.getMonthInChinese(),
    solarTerm: lunar.getJieQi() || null,
  };
}
