import type { Almanac } from '../../../../../lib/core';
import { HourCard } from '../../../../../components/HourCard';
import { Text } from '../../../../../components/AppText';
import { SectionTitle } from '../../../../../components/ui';

export function Hours({ almanac }: { almanac: Almanac }) {
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
