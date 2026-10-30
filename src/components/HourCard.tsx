import { memo } from 'react';
import { View } from 'react-native';
import type { TimeSlot } from '../lib/core';
import { Text } from './AppText';
import { Pill, Section } from './ui';

type HourInfo = Pick<
  TimeSlot,
  | 'ganzhi'
  | 'startTime'
  | 'endTime'
  | 'tianshen'
  | 'tianshenLuck'
  | 'chongShengXiao'
  | 'sha'
  | 'yi'
  | 'ji'
>;

export const HourCard = memo(function HourCard({ slot }: { slot: HourInfo }) {
  const good = slot.tianshenLuck === '吉';

  return (
    <Section className="mb-2.5">
      <View className="flex-row items-center justify-between gap-2">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-[17px] font-bold text-ink">
            {slot.ganzhi}时
          </Text>
          <Text className="text-[13px] text-muted">
            {slot.startTime}-{slot.endTime}
          </Text>
        </View>
        <Pill tone={good ? 'green' : 'red'}>
          {slot.tianshenLuck} · {slot.tianshen}
        </Pill>
      </View>
      <Text className="mt-2.5 text-[13px] text-muted">
        冲煞：冲{slot.chongShengXiao} 煞{slot.sha}
      </Text>
      <Text className="mt-2 text-[13px] leading-5">
        <Text className="text-success">宜：</Text>
        <Text className="text-ink">{slot.yi.join(' ')}</Text>
      </Text>
      <Text className="mt-1 text-[13px] leading-5">
        <Text className="text-brand">忌：</Text>
        <Text className="text-ink">{slot.ji.join(' ')}</Text>
      </Text>
    </Section>
  );
});
