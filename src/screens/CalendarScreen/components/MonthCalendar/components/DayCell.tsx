import type { Dayjs } from 'dayjs';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui';

export const DayCell = memo(function DayCell({
  date,
  label,
  accent,
  inMonth,
  isSelected,
  isToday,
  onSelect,
}: {
  date: Dayjs;
  label: string;
  accent: boolean;
  inMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onSelect: (date: Dayjs) => void;
}) {
  return (
    <Pressable
      onPress={() => onSelect(date)}
      className={`h-[62px] w-[14.2857%] items-center justify-center ${
        inMonth ? '' : 'opacity-30'
      }`}
    >
      <View
        className={`h-[54px] min-w-[46px] items-center justify-center overflow-hidden rounded-[12px] px-2 ${
          isSelected
            ? 'bg-brand'
            : isToday
              ? 'border-[1.5px] border-brand'
              : ''
        }`}
      >
        <Text
          className={`text-[18px] font-semibold leading-none ${
            isSelected
              ? 'text-white'
              : isToday
                ? 'text-brand'
                : 'text-ink'
          }`}
        >
          {date.date()}
        </Text>
        <Text
          className={`mt-[3px] text-[11px] leading-none ${
            isSelected
              ? 'text-white'
              : accent
                ? 'text-brand'
                : 'text-muted'
          }`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
});
