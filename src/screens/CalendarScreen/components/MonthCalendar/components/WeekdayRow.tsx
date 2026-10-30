import { View } from 'react-native';
import { Text } from '@/components/ui';
import { WEEKDAYS } from '../lib';

export function WeekdayRow() {
  return (
    <View
      className="absolute left-0 right-0 top-[48px] h-[28px] flex-row items-center px-[18px]"
      pointerEvents="none"
    >
      {WEEKDAYS.map((day) => (
        <Text
          key={day}
          className="flex-1 text-center text-[13px] text-muted"
        >
          {day}
        </Text>
      ))}
    </View>
  );
}
