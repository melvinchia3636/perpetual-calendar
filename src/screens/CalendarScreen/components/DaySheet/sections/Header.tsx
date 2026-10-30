import { View } from 'react-native';
import type { DayDetails } from '../../../../../lib/core';
import { Text } from '../../../../../components/AppText';

export function Header({ details }: { details: DayDetails }) {
  const { almanac } = details;
  const [year, month, day] = details.date.split('-').map(Number) as [
    number,
    number,
    number,
  ];

  return (
    <View className="mt-1 flex-row items-center gap-3">
      <View className="items-center rounded-xl border border-brand bg-brand-bg px-3 py-1.5">
        <Text className="text-[11px] text-brand">{month}月</Text>
        <Text className="text-[24px] font-bold leading-7 text-brand">
          {day}
        </Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-[22px] font-bold text-ink">
            {year}年{month}月{day}日
          </Text>
          <View className="rounded-md bg-brand-strong px-2 py-0.5">
            <Text className="text-[12px] font-medium text-white">
              {almanac.weekIndex}
            </Text>
          </View>
        </View>
        <Text className="mt-1 text-[13px] text-muted">
          {almanac.ganzhi.yearInGanZhiByLiChun}年 (
          {almanac.shengxiao.yearShengXiaoByLiChun}年){' '}
          {almanac.lunarYmd.month}月{almanac.lunarYmd.day}
        </Text>
      </View>
    </View>
  );
}
