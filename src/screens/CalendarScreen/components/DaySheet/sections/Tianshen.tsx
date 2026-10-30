import { View } from 'react-native';
import { useDaySheet } from '../contexts/DaySheetContext';
import { Text } from '@/components/ui';
import { Chip, Pill, Section, SectionTitle } from '@/components/ui';

export function Tianshen() {
  const { almanac } = useDaySheet();

  const groups = [
    {
      tone: 'green',
      badgeClassName: 'bg-success',
      label: '吉神宜趋',
      hint: '诸吉星加临庇佑',
      hintClassName: 'text-success',
      items: almanac.jishenxiongsha.dayJiShen,
    },
    {
      tone: 'red',
      badgeClassName: 'bg-brand',
      label: '凶煞宜忌',
      hint: '诸凶星所临宜避',
      hintClassName: 'text-brand',
      items: almanac.jishenxiongsha.dayXiongSha,
    },
  ] as const;

  return (
    <>
      <SectionTitle
        right={
          <Pill tone="gold">
            值神：{almanac.tianshen.dayTianShen} ·{' '}
            {almanac.tianshen.dayTianShenType === '黄道'
              ? '黄道吉日'
              : '黑道日'}
          </Pill>
        }
      >
        吉凶神煞与值神
      </SectionTitle>

      {groups.map(
        (
          { tone, badgeClassName, label, hint, hintClassName, items },
          index,
        ) => (
          <Section
            key={tone}
            tone={tone}
            className={index === 0 ? 'mb-2.5' : ''}
          >
            <View className="flex-row items-center gap-2.5">
              <View className={`rounded-lg ${badgeClassName} px-2.5 py-1`}>
                <Text className="text-[13px] font-bold text-white">
                  {label}
                </Text>
              </View>
              <Text className={`text-[13px] ${hintClassName}`}>{hint}</Text>
            </View>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item} tone={tone}>
                  {item}
                </Chip>
              ))}
            </View>
          </Section>
        ),
      )}
    </>
  );
}
