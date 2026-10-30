declare module 'lunar-javascript' {
  export class NineStar {
    toFullString(): string;
  }

  export class Solar {
    static fromYmd(year: number, month: number, day: number): Solar;
    getLunar(): Lunar;
    getFestivals(): string[];
    getOtherFestivals(): string[];
    getXingZuo(): string;
    getJulianDay(): number;
    toYmd(): string;
  }

  export class JieQi {
    getName(): string;
    getSolar(): Solar;
  }

  export class LunarTime {
    getMinHm(): string;
    getMaxHm(): string;
    getGanZhi(): string;
    getGan(): string;
    getZhi(): string;
    getShengXiao(): string;
    getTianShen(): string;
    getTianShenType(): string;
    getTianShenLuck(): string;
    getYi(): string[];
    getJi(): string[];
    getChongGan(): string;
    getChong(): string;
    getChongShengXiao(): string;
    getChongDesc(): string;
    getSha(): string;
    getNineStar(): NineStar;
  }

  export class Lunar {
    getDayYi(sect?: number): string[];
    getDayJi(sect?: number): string[];
    getTimes(): LunarTime[];

    getYearInChinese(): string;
    getMonthInChinese(): string;
    getDayInChinese(): string;

    getFestivals(): string[];
    getOtherFestivals(): string[];
    getJieQi(): string;

    getDayPositionTai(): string;
    getPengZuGan(): string;
    getPengZuZhi(): string;

    getYearGanByLiChun(): string;
    getYearZhiByLiChun(): string;
    getYearInGanZhiByLiChun(): string;
    getMonthGan(): string;
    getMonthZhi(): string;
    getMonthInGanZhi(): string;
    getDayGan(): string;
    getDayZhi(): string;
    getDayInGanZhi(): string;

    getYearShengXiaoByLiChun(): string;
    getMonthShengXiao(): string;
    getDayShengXiao(): string;

    getDayPositionYangGuiDesc(): string;
    getDayPositionYinGuiDesc(): string;
    getDayPositionXiDesc(): string;
    getDayPositionFuDesc(): string;
    getDayPositionCaiDesc(): string;

    getDayJiShen(): string[];
    getDayXiongSha(): string[];

    getDayChongDesc(): string;
    getDaySha(): string;
    getTimeChongGan(): string;
    getTimeChongShengXiao(): string;
    getTimeChong(): string;
    getTimeChongDesc(): string;
    getTimeSha(): string;

    getDayTianShen(): string;
    getDayTianShenType(): string;
    getDayTianShenLuck(): string;

    getYearNaYin(): string;
    getMonthNaYin(): string;
    getDayNaYin(): string;
    getTimeNaYin(): string;

    getZhiXing(): string;
    getXiu(): string;
    getAnimal(): string;
    getXiuLuck(): string;
    getXiuSong(): string;
    getZheng(): string;
    getGong(): string;
    getShou(): string;
    getDayLu(): string;
    getYueXiang(): string;

    getDayNineStar(): NineStar;
    getTimeNineStar(): NineStar;

    getLiuYao(): string;
    getPrevJieQi(wholeDay?: boolean): JieQi | null;
    getNextJieQi(wholeDay?: boolean): JieQi | null;
  }

  export class LunarYear {
    static fromYear(year: number): LunarYear;

    getTouLiang(): string;
    getCaoZi(): string;
    getGengTian(): string;
    getHuaShou(): string;
    getZhiShui(): string;
    getTuoGu(): string;
    getQiangMi(): string;
    getKanCan(): string;
    getGongZhu(): string;
    getJiaTian(): string;
    getFenBing(): string;
    getDeJin(): string;
    getRenBing(): string;
    getRenChu(): string;
  }
}
