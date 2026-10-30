import dayjs from 'dayjs';
import { Pressable, ScrollView } from 'react-native';
import type { DayMatch } from '@/lib/core';
import { HourCard } from '@/components/HourCard';
import { AppModal } from '@/components/AppModal';
import { Text } from '@/components/ui';
import { useApp } from '@/contexts/AppContext';

export function HourGroupModal({
  item,
  onClose,
}: {
  item: DayMatch;
  onClose: () => void;
}) {
  const { pickDate } = useApp();

  return (
    <AppModal
      visible
      title={`${dayjs(item.date).format('M月D日')} ${item.weekday}`}
      subtitle={`农历${item.lunar} · ${item.ganzhiYear}年 ${item.ganzhiMonth}月 ${item.ganzhiDay}日 · ${item.hours.length} 个匹配时辰`}
      onClose={onClose}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {item.hours.map((slot) => (
          <HourCard
            key={`${item.date}-${slot.ganzhi}-${slot.startTime}`}
            slot={slot}
          />
        ))}
      </ScrollView>

      <Pressable
        onPress={() => {
          onClose();
          pickDate(dayjs(item.date));
        }}
        className="mt-3 self-start rounded-lg border border-line bg-card px-3 py-2"
      >
        <Text className="text-[13px] text-ink">查看当天详情</Text>
      </Pressable>
    </AppModal>
  );
}
