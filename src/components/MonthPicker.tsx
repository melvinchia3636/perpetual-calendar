import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Text } from './ui/Text';
import { AppModal } from './AppModal';

const MIN_YEAR = 1900;
const MAX_YEAR = 2099;

export function MonthPicker({
  value,
  onSelect,
  onClose,
}: {
  value: Dayjs;
  onSelect: (month: Dayjs) => void;
  onClose: () => void;
}) {
  const [year, setYear] = useState(value.year());

  const shiftYear = (delta: number) => {
    setYear((current) =>
      Math.max(MIN_YEAR, Math.min(MAX_YEAR, current + delta)),
    );
  };

  const select = (month: number) => {
    onSelect(value.year(year).month(month).startOf('month'));
    onClose();
  };

  return (
    <AppModal visible title="选择月份" onClose={onClose}>
      <View className="mb-4 flex-row items-center justify-between rounded-xl border border-line bg-card px-1">
            <IconButton
              icon="chevron-double-left"
              size={20}
              iconColor="#F2F2F3"
              onPress={() => shiftYear(-10)}
            />
            <IconButton
              icon="chevron-left"
              size={20}
              iconColor="#F2F2F3"
              onPress={() => shiftYear(-1)}
            />
            <Text className="text-[17px] font-semibold text-ink">
              {year}年
            </Text>
            <IconButton
              icon="chevron-right"
              size={20}
              iconColor="#F2F2F3"
              onPress={() => shiftYear(1)}
            />
            <IconButton
              icon="chevron-double-right"
              size={20}
              iconColor="#F2F2F3"
              onPress={() => shiftYear(10)}
            />
          </View>

          <View className="flex-row flex-wrap gap-2">
            {Array.from({ length: 12 }, (_, month) => month).map((month) => {
              const active =
                value.year() === year && value.month() === month;

              return (
                <Pressable
                  key={month}
                  onPress={() => select(month)}
                  className={`h-12 w-[31.5%] items-center justify-center rounded-xl border ${
                    active
                      ? 'border-brand bg-brand'
                      : 'border-line bg-card'
                  }`}
                >
                  <Text
                    className={`text-[15px] ${
                      active ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {month + 1}月
                  </Text>
                </Pressable>
              );
            })}
          </View>
    </AppModal>
  );
}
