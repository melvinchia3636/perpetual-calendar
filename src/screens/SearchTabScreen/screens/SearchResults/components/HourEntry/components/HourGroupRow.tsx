import dayjs from 'dayjs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, View } from 'react-native';
import type { DayMatch } from '@/lib/core';
import { Text } from '@/components/ui';
import { Section } from '@/components/ui';

export function HourGroupRow({
  item,
  onPress,
}: {
  item: DayMatch;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Section className="mx-[18px] mt-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex-row items-baseline gap-2">
              <Text className="text-[17px] font-bold text-ink">
                {dayjs(item.date).format('M月D日')}
              </Text>
              <Text className="text-[13px] text-muted">{item.weekday}</Text>
            </View>

            <Text className="mt-0.5 text-[13px] text-muted">
              {item.hours.length} 个时辰 · 农历{item.lunar} ·{' '}
              {item.ganzhiYear}年 {item.ganzhiMonth}月 {item.ganzhiDay}日
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color="#9A9AA2"
          />
        </View>
      </Section>
    </Pressable>
  );
}
