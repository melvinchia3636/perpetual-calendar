import { View } from 'react-native';
import type { Almanac, DayCalendarInfo } from '../../../../../lib/core';
import { Text } from '../../../../../components/AppText';
import { Section, SectionTitle } from '../../../../../components/ui';

function MetaRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row gap-4 py-3.5 ${
        last ? '' : 'border-b border-line'
      }`}
    >
      <Text className="w-24 text-[13px] leading-5 text-muted">{label}</Text>
      <Text className="flex-1 text-right text-[13px] leading-5 text-ink">
        {value}
      </Text>
    </View>
  );
}

export function Meta({
  almanac,
  calendar,
}: {
  almanac: Almanac;
  calendar: DayCalendarInfo;
}) {
  return (
    <>
      <SectionTitle>多元历法与天象</SectionTitle>
      <Section padded={false} className="px-4">
        <MetaRow label="今日九星" value={almanac.nine.dayNineStar} />
        <MetaRow label="今日月相" value={almanac.yue} />
        <MetaRow label="佛历年" value={`${calendar.buddhistYear}年`} />
        <MetaRow label="伊斯兰历 (回历)" value={calendar.islamicDate} />
        <MetaRow
          label="儒略日 (Julian Day)"
          value={calendar.julianDay.toFixed(1)}
          last
        />
      </Section>
    </>
  );
}
