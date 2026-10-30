import { View } from 'react-native';
import type { Almanac, DayCalendarInfo } from '../../../../../lib/core';
import { seasonOf } from '../../../../../lib/zodiac';
import { Text } from '../../../../../components/AppText';
import {
  InfoTile,
  Section,
  SectionTitle,
} from '../../../../../components/ui';

export function Zodiac({
  almanac,
  calendar,
  month,
}: {
  almanac: Almanac;
  calendar: DayCalendarInfo;
  month: number;
}) {
  const nayinRows = [
    { label: '年五行', value: almanac.nayin.yearNaYin },
    { label: '月五行', value: almanac.nayin.monthNaYin },
    { label: '日五行', value: almanac.nayin.dayNaYin },
  ];

  return (
    <>
      <SectionTitle>生肖星座与神煞</SectionTitle>
      <View className="flex-row gap-2.5">
        <InfoTile
          label="生肖属相"
          value={`${almanac.shengxiao.yearShengXiaoByLiChun}年 · 属${almanac.shengxiao.yearShengXiaoByLiChun}`}
        />
        <InfoTile label="天象星座" value={`${calendar.xingZuo}座`} />
      </View>
      <View className="mt-2.5 flex-row gap-2.5">
        <InfoTile
          label="建除十二神"
          value={`${almanac.zhixing}执位`}
        />
        <InfoTile label="六曜吉凶" value={calendar.liuYao} />
      </View>
      <View className="mt-2.5 flex-row gap-2.5">
        <InfoTile label="所属季节" value={`${seasonOf(month)}季`} />
        <InfoTile
          label="今日星宿"
          value={`${almanac.xiu.xiu}宿（${almanac.xiu.xiu}${almanac.xiu.zheng}${almanac.xiu.animal}）`}
        />
      </View>

      <Section className="mt-2.5">
        <Text className="text-[13px] text-muted">纳音五行</Text>
        <View className="mt-2.5 flex-row">
          {nayinRows.map((item, index) => (
            <View
              key={item.label}
              className={`flex-1 items-center ${
                index > 0 ? 'border-l border-line' : ''
              }`}
            >
              <Text className="text-[12px] text-faint">{item.label}</Text>
              <Text className="mt-1.5 text-[16px] font-semibold text-ink">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section className="mt-2.5">
        <Text className="text-[13px] text-muted">节气详情</Text>
        <Text className="mt-1.5 text-[14px] leading-5 text-ink">
          {calendar.jieQi
            ? `${calendar.jieQi.name} 第${calendar.jieQi.dayIndex}天（距下一个节气“${calendar.jieQi.nextName}”，还有${calendar.jieQi.daysToNext}天）`
            : '—'}
        </Text>
      </Section>
    </>
  );
}
