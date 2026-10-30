import { HourCard } from '@/components/HourCard';
import { useDaySheet } from '../contexts/DaySheetContext';
import { Text } from '@/components/ui';
import { SectionTitle } from '@/components/ui';

export function Hours() {
  const { almanac } = useDaySheet();
  const luckyHours = almanac.timeList.filter(
    (slot) => slot.tianshenLuck === '吉',
  ).length;

  return (
    <>
      <SectionTitle
        right={
          <Text className="text-[13px] text-muted">
            共 {luckyHours} 吉时 · {almanac.timeList.length - luckyHours} 凶时
          </Text>
        }
      >
        十二时辰吉凶
      </SectionTitle>
      {almanac.timeList.map((slot) => (
        <HourCard key={`${slot.ganzhi}-${slot.startTime}`} slot={slot} />
      ))}
    </>
  );
}
