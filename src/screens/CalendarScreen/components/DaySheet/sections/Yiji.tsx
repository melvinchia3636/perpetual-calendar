import { View } from 'react-native';
import { useDaySheet } from '../contexts/DaySheetContext';
import { Text } from '@/components/ui';
import { SectionTitle } from '@/components/ui';

function YiJiCard({ type, items }: { type: 'yi' | 'ji'; items: string[] }) {
  const good = type === 'yi';
  const theme = good
    ? {
        border: 'border-success-line',
        badge: 'bg-success',
        text: 'text-success',
        mark: '宜',
        title: '今日宜',
        hint: '顺应天时 · 择吉而行',
      }
    : {
        border: 'border-brand-line',
        badge: 'bg-brand',
        text: 'text-brand',
        mark: '忌',
        title: '今日忌',
        hint: '审慎行事 · 规避凶煞',
      };

  return (
    <View className={`rounded-2xl border p-3.5 ${theme.border}`}>
      <View className="flex-row items-center">
        <View
          className={`h-6 w-6 items-center justify-center rounded-md ${theme.badge}`}
        >
          <Text className="text-[12px] font-bold text-white">
            {theme.mark}
          </Text>
        </View>
        <Text
          className={`ml-2 text-[14px] font-semibold ${theme.text}`}
        >
          {theme.title}
        </Text>
        <Text className="ml-auto text-[12px] text-faint">{theme.hint}</Text>
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <View
              key={item}
              className="rounded-lg border border-line bg-card-alt px-2.5 py-1"
            >
              <Text className="text-[13px] text-ink">{item}</Text>
            </View>
          ))
        ) : (
          <Text className="text-[13px] text-faint">-</Text>
        )}
      </View>
    </View>
  );
}

export function Yiji() {
  const { almanac } = useDaySheet();
  const cards = [
    { type: 'yi' as const, items: almanac.yiji.yi },
    { type: 'ji' as const, items: almanac.yiji.ji },
  ];

  return (
    <>
      <SectionTitle>今日宜忌</SectionTitle>
      {cards.map((card, index) => (
        <View key={card.type} className={index > 0 ? 'mt-2.5' : ''}>
          <YiJiCard {...card} />
        </View>
      ))}
    </>
  );
}
