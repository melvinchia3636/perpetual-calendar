import { View } from 'react-native';
import { useDaySheet } from '../contexts/DaySheetContext';
import { Text } from '@/components/ui';
import { Section, SectionTitle } from '@/components/ui';

export function Meta() {
  const { almanac, calendar } = useDaySheet();
  const rows = [
    { label: '今日九星', value: almanac.nine.dayNineStar },
    { label: '今日月相', value: almanac.yue },
    { label: '佛历年', value: `${calendar.buddhistYear}年` },
    { label: '伊斯兰历 (回历)', value: calendar.islamicDate },
    { label: '儒略日 (Julian Day)', value: calendar.julianDay.toFixed(1) },
  ];

  return (
    <>
      <SectionTitle>多元历法与天象</SectionTitle>
      <Section padded={false} className="px-4">
        {rows.map(({ label, value }, index) => (
          <View
            key={label}
            className={`flex-row gap-4 py-3.5 ${
              index === rows.length - 1 ? '' : 'border-b border-line'
            }`}
          >
            <Text className="w-24 text-[13px] leading-5 text-muted">
              {label}
            </Text>
            <Text className="flex-1 text-right text-[13px] leading-5 text-ink">
              {value}
            </Text>
          </View>
        ))}
      </Section>
    </>
  );
}
